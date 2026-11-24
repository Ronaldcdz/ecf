/**
 * Decides when `bun run test:e2e` needs the WebKit Docker server (ADR 0063).
 * `argv` is what Playwright receives after `playwright test`.
 */
import { describe, expect, it } from 'vitest'
import { runsWebkit } from './runs-webkit'

describe('runsWebkit', () => {
  it('is true with no --project, because all three browsers run', () => {
    expect(runsWebkit(['test'])).toBe(true)
  })

  it('is false when only other browsers are selected', () => {
    expect(runsWebkit(['test', '--project=chromium'])).toBe(false)
    expect(runsWebkit(['test', '--project', 'chromium', 'firefox'])).toBe(false)
    expect(runsWebkit(['test', '--project=chromium', '--project=firefox'])).toBe(false)
  })

  it('is true when webkit is among the selected projects', () => {
    expect(runsWebkit(['test', '--project=webkit'])).toBe(true)
    expect(runsWebkit(['test', '--project', 'chromium', 'webkit'])).toBe(true)
    expect(runsWebkit(['test', '--project=chromium', '--project=WebKit'])).toBe(true)
  })

  it('supports wildcards', () => {
    expect(runsWebkit(['test', '--project=*kit'])).toBe(true)
    expect(runsWebkit(['test', '--project=chrom*'])).toBe(false)
  })

  it('stops reading project names at the next option', () => {
    // `webkit` here is a file filter after `--headed`, not a project name.
    expect(runsWebkit(['test', '--project', 'chromium', '--headed', 'webkit'])).toBe(false)
  })

  it('treats regex characters such as "." literally', () => {
    expect(runsWebkit(['test', '--project=web.it'])).toBe(false)
  })
})
