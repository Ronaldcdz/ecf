import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'

// Executable spec for S3 (ADR 0036): components only use semantic token classes.
// It lints a fake component with the real apps/web ESLint config.
// `URL` instead of `node:url`: files under app/ are typechecked without Node types.
const webRoot = decodeURIComponent(new URL('../../../../', import.meta.url).pathname)
const eslint = new ESLint({ cwd: webRoot })

async function tailwindErrors(classes: string): Promise<string[]> {
  const component = `<template>\n  <div class="${classes}" />\n</template>\n`
  const [result] = await eslint.lintText(component, {
    filePath: `${webRoot}layers/base/app/components/LintSample.vue`,
  })
  return (result?.messages ?? [])
    .filter((message) => message.ruleId?.startsWith('better-tailwindcss/'))
    .map((message) => message.ruleId ?? '')
}

describe('Tailwind classes in components (S3, ADR 0036)', () => {
  it.each([
    'text-primary',
    'bg-default',
    'text-muted',
    'border-default',
    'bg-elevated',
    'text-error',
    'hover:bg-primary/10',
    'p-4',
    'gap-2',
    'md:grid-cols-2',
    'font-sans',
    'tabular-nums',
    'rounded-md',
  ])('allows the token class "%s"', async (cls) => {
    expect(await tailwindErrors(cls)).toEqual([])
  })

  it.each([
    ['an arbitrary color', 'text-[#123456]'],
    ['an arbitrary spacing', 'p-[13px]'],
    ['a CSS variable shorthand', 'p-(--my-gap)'],
    ['a default Tailwind palette', 'bg-red-500'],
    ['a default palette with a variant and opacity', 'dark:hover:text-slate-700/50'],
    ['a brand scale (ADR 0036)', 'bg-brand-blue-200'],
    ['a semantic scale with a shade (ADR 0036)', 'bg-primary-100'],
    ['plain white', 'bg-white'],
    ['plain black', 'text-black'],
  ])('rejects %s: "%s"', async (_case, cls) => {
    expect(await tailwindErrors(cls)).toContain('better-tailwindcss/no-restricted-classes')
  })

  it('rejects a class that Tailwind does not know', async () => {
    expect(await tailwindErrors('text-primery')).toContain('better-tailwindcss/no-unknown-classes')
  })
})
