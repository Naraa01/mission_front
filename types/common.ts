import { z } from 'zod'

export const LoginValidation = z.object({
  email: z.string().email('E-Mail зөв оруулна уу!'),
  password: z.string().min(4, 'Нууц үг дөрвөөс бага байж болохгүй!'),
})

export type LoginRequest = z.infer<typeof LoginValidation>