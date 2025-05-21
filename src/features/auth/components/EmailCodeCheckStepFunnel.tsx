import { useFormContext } from 'react-hook-form';
import useEmailCodeCheckMutation from '@/features/auth/hooks/useEmailCodeCheckMutation';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

type EmailCodeCheckStepFunnelProps = {
  onNext: (emailCheckCode: string) => void;
  context: Partial<SignupValues> & Pick<SignupValues, 'email'>;
};

const EmailCodeCheckStepFunnel = ({
  onNext,
  context,
}: EmailCodeCheckStepFunnelProps) => {
  const { control, getValues, trigger } = useFormContext<SignupValues>();
  const { mutateAsync: emailCodeCheckMutateAsync } =
    useEmailCodeCheckMutation();

  const handleOnClick = async () => {
    const isValid = await trigger('emailCodeCheck');
    if (!isValid) {
      return;
    }

    try {
      await emailCodeCheckMutateAsync({
        email: context.email,
        verificationCode: getValues('emailCodeCheck'),
      });

      onNext(getValues('emailCodeCheck'));
    } catch {
      return;
    }
  };

  return (
    <>
      <h2>이메일 인증</h2>
      <Form.Field
        control={control}
        name="emailCodeCheck"
        render={({ field, formState }) => (
          <>
            <Form.Control field={field} placeholder="인증번호를 입력해주세요" />
            <Form.ErrorMessage
              errorMessage={formState.errors.emailCodeCheck?.message}
            />
          </>
        )}
      />
      <Button onClick={handleOnClick}>확인하기</Button>
    </>
  );
};

export default EmailCodeCheckStepFunnel;
