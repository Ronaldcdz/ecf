/**
 * True when a Playwright run includes the `webkit` project. Playwright 1.65 has no
 * per-project `webServer`, so the WebKit Docker server (ADR 0063) starts only when
 * `--project` is absent or selects WebKit.
 * Handles `--project=a`, `--project a b` and wildcards such as `--project=*kit`.
 */
export function runsWebkit(argv: readonly string[]): boolean {
  const selected: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!
    if (arg.startsWith('--project=')) selected.push(arg.slice('--project='.length))
    else if (arg === '--project') {
      while (argv[i + 1] && !argv[i + 1]!.startsWith('-')) selected.push(argv[++i]!)
    }
  }
  if (selected.length === 0) return true
  return selected.some((pattern) => wildcardToRegExp(pattern).test('webkit'))
}

/** `*kit` → /^.*kit$/i, escaping every other regex character. */
function wildcardToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '.*')
  return new RegExp(`^${escaped}$`, 'i')
}
