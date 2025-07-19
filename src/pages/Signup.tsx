import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFunnel } from '@use-funnel/react-router';
import EmailStepFunnel from '@/features/auth/components/EmailStepFunnel';
import PasswordStepFunnel from '@/features/auth/components/PasswordStepFunnel';
import useSignupMutation from '@/features/auth/hooks/useSignupMutation';
import { signupSchema, SignupValues } from '@/features/auth/validation/schema';
import { signupSteps } from '@/features/auth/validation/stepContext';
import { Form } from '@/shared/components/form';

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
            <EmailStepFunnel
              funnelIndex={funnel.index}
              onNext={(props) =>
                history.push('PasswordStep', { ...context, ...props })
              }
            />
          )}
          PasswordStep={() => <PasswordStepFunnel funnelIndex={funnel.index} />}
        />
      </form>
    </Form.Root>
  );
};

export default Signup;
