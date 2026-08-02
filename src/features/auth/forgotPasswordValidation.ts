import { z } from 'zod'

export type ForgotPasswordValidationMessages = {
  requiredField: string
  invalidEmail: string
}

export function createForgotPasswordValidationSchema(messages: ForgotPasswordValidationMessages) {
  return z.object({
    email: z.string().trim().min(1, messages.requiredField).email(messages.invalidEmail),
  })
}

export type ForgotPasswordFormInput = z.input<ReturnType<typeof createForgotPasswordValidationSchema>>
export type ForgotPasswordFormOutput = z.output<ReturnType<typeof createForgotPasswordValidationSchema>>
