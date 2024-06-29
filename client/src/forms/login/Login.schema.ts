import { z, ZodType } from 'zod';

export type loginData = {
  email: string;
  password: string;
};

// validation schema for the login user
export const loginSchema: ZodType<loginData> = z.object({
  email: z
    .string()
    .min(1, { message: 'Please provide valid email' })
    .email('Please provide valid email')
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/, {
      message: 'Please provide valid email'
    }),
  password: z.string().min(1, {
    message: 'Please provide password'
  })
});
