import { z } from 'zod'

export interface PageI<T> {
  list: T
  page: number
  total: number
  max: number
}

export interface ProductResponse {
  id: number
  name?: string
  count?: string
  description?: string
  price?: string
  imageUrl?: string
}

export const LoginValidation = z.object({
  email: z.string().email('E-Mail зөв оруулна уу!'),
  password: z.string().min(4, 'Нууц үг дөрвөөс бага байж болохгүй!'),
})

export type LoginRequest = z.infer<typeof LoginValidation>

export const RegisterValidation = z
  .object({
    email: z.string().email('E-Mail зөв оруулна уу!'),
    password: z.string().min(8, 'Нууц үг багадаа 8 байна!'),
    passwordConfirmation: z.string().min(8, 'Нууц үг багадаа 8 байна!'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Нууц үг тохирохгүй байна',
    path: ['passwordConfirmation'],
  })

export type RegisterSchema = z.infer<typeof RegisterValidation>
