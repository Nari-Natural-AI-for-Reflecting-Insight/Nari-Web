import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@use-funnel/react-router';
import EmailStepFunnel from '@/features/auth/components/EmailStepFunnel';
import PasswordStepFunnel from '@/features/auth/components/PasswordStepFunnel';
import useSignupMutation from '@/features/auth/hooks/useSignupMutation';
import { signupSchema, SignupValues } from '@/features/auth/validation/schema';
import { signupSteps } from '@/features/auth/validation/stepContext';
import { Form } from '@/shared/components/form';
import SignupLayout from '@/shared/layout/SignupLayout';

const Signup = () => {
  const { mutate: signupMutate } = useSignupMutation();
  const funnel = useFunnel({
    id: 'signup',
    steps: signupSteps,
    initial: {
      step: 'EmailStep',
      context: {
        email: '',
        emailCodeCheck: '',
        password: '',
        passwordConfirm: '',
      },
    },
  });
  const methods = useForm<SignupValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: {
      ...funnel.context,
    },
  });
  // TODO : 새로고침시 히스토리, RHF 상태 동기화
  // console.log(funnel.context);

  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    const { password, email } = data;
    signupMutate({ password, email });
  };

  return (
    <Form.Root {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <funnel.Render
          EmailStep={({ history, context }) => (
            <SignupLayout
              title="NARI를 이용하기위해
            인증번호를 입력 해 주세요."
              index={funnel.index}
            >
              <EmailStepFunnel
                onNext={(props) =>
                  history.push('PasswordStep', { ...context, ...props })
                }
              />
            </SignupLayout>
          )}
          PasswordStep={() => (
            <SignupLayout
              title="사용하실 비밀번호를
            설정해주세요."
              index={funnel.index}
            >
              <PasswordStepFunnel />
            </SignupLayout>
          )}
        />
      </form>
    </Form.Root>
  );
};

export default Signup;
