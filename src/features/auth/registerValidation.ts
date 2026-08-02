import { z } from 'zod'

export type RegisterValidationMessages = {
  requiredField: string
  invalidEmail: string
  nameTooLong: string
  invalidPhone: string
  passwordTooShort: string
  passwordRequirements: string
  passwordMismatch: string
}

function isValidInternationalPhone(value: string): boolean {
  if (!/^\+?[\d\s()-]+$/.test(value)) {
    return false
  }

  const digitsOnly = value.replace(/\D/g, '')
  return digitsOnly.length >= 7 && digitsOnly.length <= 15
}

export function createRegisterValidationSchema(messages: RegisterValidationMessages) {
  return z
    .object({
      firstName: z.string().trim().min(1, messages.requiredField).max(50, messages.nameTooLong),
      lastName: z.string().trim().min(1, messages.requiredField).max(50, messages.nameTooLong),
      email: z.string().trim().min(1, messages.requiredField).email(messages.invalidEmail),
      phone: z
        .string()
        .trim()
        .transform((value) => (value === '' ? undefined : value))
        .refine((value) => value === undefined || isValidInternationalPhone(value), {
          message: messages.invalidPhone,
        }),
      password: z
        .string()
        .min(1, messages.requiredField)
        .min(8, messages.passwordTooShort)
        .regex(/\p{L}/u, messages.passwordRequirements)
        .regex(/\d/u, messages.passwordRequirements),
      confirmPassword: z.string().min(1, messages.requiredField),
    })
    .refine((values) => values.password === values.confirmPassword, {
      path: ['confirmPassword'],
      message: messages.passwordMismatch,
    })
}

export type RegisterFormInput = z.input<ReturnType<typeof createRegisterValidationSchema>>
export type RegisterFormOutput = z.output<ReturnType<typeof createRegisterValidationSchema>>
