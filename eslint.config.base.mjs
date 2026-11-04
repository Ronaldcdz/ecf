import js from '@eslint/js'
import prettier from 'eslint-config-prettier/flat'
import tseslint from 'typescript-eslint'

// Rules every package shares, including the Nuxt app.
export const sharedRules = [
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  prettier,
]

// Full config for packages that are not Nuxt (shared). apps/api uses oxlint.
export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  sharedRules,
)
