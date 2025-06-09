import { baseSignupSchema } from '@/features/auth/validation/schema';

const emailStepSchema = baseSignupSchema.partial();

const passwordStepSchema = emailStepSchema.required({
  email: true,
  emailCodeCheck: true,
});

export const signupSteps = {
  EmailStep: { parse: emailStepSchema.parse },
  PasswordStep: { parse: passwordStepSchema.parse },
};
