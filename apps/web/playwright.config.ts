import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'
import { runsWebkit } from './playwright/runs-webkit'

/**
 * E2E tests with `@nuxt/test-utils/playwright` (ADR 0059).
 * - Each layer keeps its flows in `layers/<layer>/e2e/` (ADR 0060).
 * - Three engines: Chromium, Firefox and WebKit (ADR 0061).
 * - Against the Nuxt dev server, not a production build (ADR 0062).
 * - WebKit runs inside Playwright's official Docker image (ADR 0063).
 */

// The Docker image must match the installed Playwright version exactly.
const { version: playwrightVersion } = createRequire(import.meta.url)(
  '@playwright/test/package.json',
) as { version: string }
const WEBKIT_IMAGE = `mcr.microsoft.com/playwright:v${playwrightVersion}-noble`
const WEBKIT_CONTAINER = 'ecf-playwright-webkit'
const WEBKIT_SERVER_PORT = 3123

// Playwright's WebKit is built for Ubuntu and cannot start on Arch (ADR 0063),
// so a Playwright server in an Ubuntu container runs it.
const webkitServer = {
  command: [
    // Fail fast with the exact fix instead of pulling 3.68 GB inside the start timeout.
    `docker image inspect ${WEBKIT_IMAGE} >/dev/null 2>&1 || { echo "Missing ${WEBKIT_IMAGE}. Run: docker pull ${WEBKIT_IMAGE}" >&2; exit 1; }`,
    // Remove a container left by an interrupted run, so its port is free again.
    `docker rm -f ${WEBKIT_CONTAINER} >/dev/null 2>&1`,
    // `exec` replaces the shell, so the stop signal reaches `docker run` directly.
    // Port bound to 127.0.0.1 only: the server has no password, so other devices must not reach it.
    // The home volume keeps npx's download between runs.
    `exec docker run --rm --init --name ${WEBKIT_CONTAINER} ` +
      `-p 127.0.0.1:${WEBKIT_SERVER_PORT}:${WEBKIT_SERVER_PORT} ` +
      `-v ${WEBKIT_CONTAINER}-home:/home/pwuser --workdir /home/pwuser --user pwuser ${WEBKIT_IMAGE} ` +
      `/bin/sh -c "exec npx -y playwright@${playwrightVersion} run-server --port ${WEBKIT_SERVER_PORT} --host 0.0.0.0"`,
  ].join('; '),
  // Ready when our own server says so. Without `port`, Playwright skips its "port already used"
  // check, so the command above can remove a leftover container first. Another program on the
  // port makes `docker run` fail; tests never connect to an unknown server.
  wait: { stdout: /Listening on ws:\/\// },
  // SIGTERM reaches the container through `docker run`, which stops and removes it (`--rm`).
  gracefulShutdown: { signal: 'SIGTERM' as const, timeout: 10_000 },
  // The first run downloads the Playwright package inside the container.
  timeout: 120_000,
}

export default defineConfig<ConfigOptions>({
  testDir: './layers',
  testMatch: '*/e2e/**/*.spec.ts',
  // Fail if a stray `test.only` reaches CI.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Three workers (ADR 0064): each worker starts its own Nuxt dev server (worker-scoped fixture). With 6 servers
  // compiling at once, the first page in most of them took over 30 s; 3 pass reliably.
  workers: 3,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      dev: true,
      // One Vite cache folder per parallel worker (ADR 0066). Each worker runs its own dev
      // server; with one shared folder, a server rebuilding the cache broke the page another
      // server was loading. `TEST_PARALLEL_INDEX` (0..workers-1) is reused after a restart.
      nuxtConfig: {
        vite: { cacheDir: `node_modules/.cache/vite-e2e-${process.env.TEST_PARALLEL_INDEX ?? 'main'}` },
      },
    },
  },
  webServer: runsWebkit(process.argv) ? webkitServer : undefined,
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        connectOptions: {
          wsEndpoint: `ws://127.0.0.1:${WEBKIT_SERVER_PORT}/`,
          // Lets the browser in the container open the Nuxt server on the host's localhost.
          exposeNetwork: '<loopback>',
        },
      },
    },
  ],
})
