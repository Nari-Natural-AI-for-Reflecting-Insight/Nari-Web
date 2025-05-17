import { z } from 'zod';

const signupStepSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
    nickname: z.string(),
    emailCheckCode: z.string(),
  })
  .partial();

const emailStepSchema = signupStepSchema.partial();
const emailCheckCodeStepSchema = emailStepSchema.required({
  email: true,
});
const passwordStepSchema = emailCheckCodeStepSchema.required({
  email: true,
  emailCheckCode: true,
});
const nicknameStepSchema = passwordStepSchema.required({
  email: true,
  emailCheckCode: true,
  password: true,
  passwordConfirm: true,
});

export const signupSteps = {
  EmailStep: { parse: emailStepSchema.parse },
  EmailCheckCodeStep: { parse: emailCheckCodeStepSchema.parse },
  PasswordStep: { parse: passwordStepSchema.parse },
  NicknameStep: { parse: nicknameStepSchema.parse },
};
