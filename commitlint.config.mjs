export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Scope is optional (`docs: ...`), but when present it must name a package.
    'scope-enum': [2, 'always', ['web', 'api', 'shared']],
  },
}
