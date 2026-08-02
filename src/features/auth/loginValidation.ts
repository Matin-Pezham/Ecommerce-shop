import { z } from 'zod'

export type LoginValidationMessages = {
  requiredField: string
  invalidEmail: string
}

export function createLoginValidationSchema(messages: LoginValidationMessages) {
  return z.object({
    email: z.string().trim().min(1, messages.requiredField).email(messages.invalidEmail),
    password: z.string().min(1, messages.requiredField),
  })
}

export type LoginFormValues = z.infer<ReturnType<typeof createLoginValidationSchema>>
