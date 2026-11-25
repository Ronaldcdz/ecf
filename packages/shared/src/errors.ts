import { z } from 'zod'

// Answer of a 400: the messages of each field, `{ campo: [mensajes] }` (CLAUDE.md).
export const validationErrorsSchema = z.record(z.string(), z.array(z.string()))

export type ValidationErrors = z.infer<typeof validationErrorsSchema>

export function validationErrorsFrom(error: z.ZodError): ValidationErrors {
  const { fieldErrors } = z.flattenError(error)
  const errors: ValidationErrors = {}
  const byField: Record<string, string[] | undefined> = fieldErrors
  for (const [field, messages] of Object.entries(byField)) {
    if (messages && messages.length > 0) errors[field] = messages
  }
  return errors
}

export const errorMessageSchema = z.object({ message: z.string().min(1) })

export type ErrorMessage = z.infer<typeof errorMessageSchema>
