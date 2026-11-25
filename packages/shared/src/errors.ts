import { z } from 'zod'

/**
 * Answer for a body that does not pass validation (HTTP 400): the messages of each
 * field under its name, `{ campo: [mensajes] }` (CLAUDE.md).
 */
export const validationErrorsSchema = z.record(z.string(), z.array(z.string()))

export type ValidationErrors = z.infer<typeof validationErrorsSchema>

/** Turns the error of a failed Zod parse into the `{ campo: [mensajes] }` answer. */
export function validationErrorsFrom(error: z.ZodError): ValidationErrors {
  const { fieldErrors } = z.flattenError(error)
  const errors: ValidationErrors = {}
  const byField: Record<string, string[] | undefined> = fieldErrors
  for (const [field, messages] of Object.entries(byField)) {
    if (messages && messages.length > 0) errors[field] = messages
  }
  return errors
}

/** Answer with a single text for the whole request, as the 401 of the login (ADR 0077). */
export const errorMessageSchema = z.object({ message: z.string().min(1) })

export type ErrorMessage = z.infer<typeof errorMessageSchema>
