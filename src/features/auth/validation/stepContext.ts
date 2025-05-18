import { baseSignupSchema } from '@/features/auth/validation/schema';

const signupStepSchema = baseSignupSchema.partial();

const emailStepSchema = signupStepSchema.partial();
const emailCodeCheckStepSchema = emailStepSchema.required({
  email: true,
});
const passwordStepSchema = emailCodeCheckStepSchema.required({
  email: true,
  emailCodeCheck: true,
});
const nicknameStepSchema = passwordStepSchema.required({
  email: true,
  emailCodeCheck: true,
  password: true,
  passwordConfirm: true,
});

export const signupSteps = {
  EmailStep: { parse: emailStepSchema.parse },
  EmailCodeCheckStep: { parse: emailCodeCheckStepSchema.parse },
  PasswordStep: { parse: passwordStepSchema.parse },
  NicknameStep: { parse: nicknameStepSchema.parse },
};
