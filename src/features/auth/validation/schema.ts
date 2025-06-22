import { z } from 'zod';

export const baseSignupSchema = z.object({
  email: z.string(),
  emailCodeCheck: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
});

export const nicknameField = z
  .string()
  .min(1, { message: '닉네임을 입력해주세요.' })
  .max(20, { message: '닉네임은 20자 이하로 입력해주세요.' });

export const passwordField = z
  .string()
  .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  .max(50, { message: '비밀번호는 50자 이하이어야 합니다.' })
  .regex(/[0-9]/, { message: '비밀번호에 숫자가 포함되어야 합니다.' })
  .regex(/[a-zA-Z]/, { message: '비밀번호에 영문자가 포함되어야 합니다.' })
  .regex(/[!@#$%^&*()]/, {
    message: '비밀번호에 특수문자(!@#$%^&*())가 포함되어야 합니다.',
  })
  .regex(/^[0-9a-zA-Z!@#$%^&*()]+$/, {
    message: '허용되지 않은 문자가 포함되어 있습니다.',
  });

export const signupSchema = baseSignupSchema
  .extend({
    email: z.string().email('올바른 이메일을 입력해주세요.'),
    password: passwordField,
    nickname: nicknameField,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export type SignupValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .max(50, { message: '비밀번호는 50자 이하이어야 합니다.' }),
});

export type SigninValues = z.infer<typeof signinSchema>;
