import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

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
const WEBKIT_SERVER_PORT = 3123

export default defineConfig<ConfigOptions>({
  testDir: './layers',
  testMatch: '*/e2e/**/*.spec.ts',
  // Fail if a stray `test.only` reaches CI.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    trace: 'on-first-retry',
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      dev: true,
    },
  },
  // Playwright's WebKit is built for Ubuntu and cannot start on Arch (ADR 0063),
  // so a Playwright server in an Ubuntu container runs it.
  webServer: {
    command:
      `docker run --rm --init -p ${WEBKIT_SERVER_PORT}:${WEBKIT_SERVER_PORT} ` +
      `--workdir /home/pwuser --user pwuser mcr.microsoft.com/playwright:v${playwrightVersion}-noble ` +
      // `exec` makes the server the shell's replacement, so it receives the stop signal.
      `/bin/sh -c "exec npx -y playwright@${playwrightVersion} run-server --port ${WEBKIT_SERVER_PORT} --host 0.0.0.0"`,
    port: WEBKIT_SERVER_PORT,
    reuseExistingServer: true,
    // SIGTERM reaches the container through `docker run`, which stops and removes it (`--rm`).
    gracefulShutdown: { signal: 'SIGTERM', timeout: 10_000 },
    // The first run downloads the Playwright package inside the container.
    timeout: 180_000,
  },
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
