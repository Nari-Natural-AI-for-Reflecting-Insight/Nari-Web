import { useFormContext } from 'react-hook-form';
import useEmailVerificationMutation from '@/features/auth/hooks/useEmailVerificationMutation';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

type EmailStepFunnelProps = {
  onNext: (email: string) => void;
};

const EmailStepFunnel = ({ onNext }: EmailStepFunnelProps) => {
  const { control, getValues, trigger } = useFormContext<SignupValues>();
  const { mutateAsync: emailVerificationMutateAsync } =
    useEmailVerificationMutation();
  const handleOnClick = async () => {
    const isValid = await trigger('email');
    if (!isValid) {
      return;
    }

    try {
      await emailVerificationMutateAsync({ email: getValues('email') });
      onNext(getValues('email'));
    } catch {
      return;
    }
  };

  return (
    <>
      <h2>당신만의 기록을 위해 이메일을 입력해주세요</h2>
      <Form.Field
        control={control}
        name="email"
        render={({ field, formState }) => (
          <>
            <Form.Control
              field={field}
              placeholder="이메일을 입력해주세요"
              autoComplete="current-email"
            />
            <Form.ErrorMessage errorMessage={formState.errors.email?.message} />
          </>
        )}
      />
      <Button onClick={handleOnClick}>인증하기</Button>
    </>
  );
};

export default EmailStepFunnel;
