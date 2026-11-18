import betterTailwindcss from 'eslint-plugin-better-tailwindcss'
import { sharedRules } from '../../eslint.config.base.mjs'
import withNuxt from './.nuxt/eslint.config.mjs'

// Every color with a shade: default Tailwind palettes, brand scales and semantic scales.
const palettes = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky',
  'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive',
  'brand-blue', 'brand-purple', 'brand-gray',
  'primary', 'secondary', 'success', 'info', 'warning', 'error',
].join('|')
const variants = '([a-z0-9:_-]*:)?!?' // e.g. `dark:hover:` and the `!` important flag
const opacity = '(\\/\\d{1,3})?' // e.g. `/50`

// S3: no loose colors or spacing outside the tokens. ADR 0036: only semantic names.
const tokenOnlyRules = {
  files: ['**/*.vue'],
  plugins: { 'better-tailwindcss': betterTailwindcss },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'layers/base/app/assets/css/main.css',
    },
  },
  rules: {
    'better-tailwindcss/no-unknown-classes': 'error',
    'better-tailwindcss/no-restricted-classes': [
      'error',
      {
        restrict: [
          {
            pattern: '.*[\\[(].*',
            message: 'Arbitrary values are not allowed: use a token (S3).',
          },
          {
            pattern: `^${variants}[a-z-]+-(${palettes})-(50|[1-9]00|950)${opacity}$`,
            message: 'Colors with a shade are not allowed: use a semantic color without shade (ADR 0036).',
          },
          {
            pattern: `^${variants}[a-z-]+-(black|white)${opacity}$`,
            message: 'Use a semantic color such as bg-default or text-highlighted (ADR 0036).',
          },
        ],
      },
    ],
  },
}

export default withNuxt(sharedRules, tokenOnlyRules)
