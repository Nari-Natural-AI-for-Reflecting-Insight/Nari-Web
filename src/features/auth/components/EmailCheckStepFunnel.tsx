import { useFormContext } from 'react-hook-form';
import useEmailVerificationCodeCheckMutation from '@/features/auth/hooks/useEmailVerificationCodeCheckMutation.ts';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

type EmailCheckCodeStepFunnelProps = {
  onNext: (emailCheckCode: string) => void;
  context: Partial<SignupValues> & Pick<SignupValues, 'email'>;
};

const EmailCheckCodeStepFunnel = ({
  onNext,
  context,
}: EmailCheckCodeStepFunnelProps) => {
  const { control, getValues, trigger } = useFormContext<SignupValues>();
  const { mutate: emailVerificationCheckCodeMutate } =
    useEmailVerificationCodeCheckMutation();

  const handleOnClick = async () => {
    const isValid = await trigger('emailCheckCode');

    if (isValid) {
      emailVerificationCheckCodeMutate({
        email: context.email,
        verificationCode: getValues('emailCheckCode'),
      });
      onNext(getValues('emailCheckCode'));
    }
  };

  return (
    <>
      <h2>이메일 인증</h2>
      <Form.Field
        control={control}
        name="emailCheckCode"
        render={({ field, formState }) => (
          <>
            <Form.Control
              field={field}
              placeholder="이메일을 입력해주세요"
              autoComplete="current-email"
            />
            <Form.ErrorMessage
              errorMessage={formState.errors.emailCheckCode?.message}
            />
          </>
        )}
      />
      <Button onClick={handleOnClick}>확인하기</Button>
    </>
  );
};

export default EmailCheckCodeStepFunnel;
