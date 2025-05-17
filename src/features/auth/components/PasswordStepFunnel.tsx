import { useFormContext } from 'react-hook-form';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

type Passwords = {
  password: string;
  passwordConfirm: string;
};

type PasswordStepFunnelProps = {
  onNext: ({ password, passwordConfirm }: Passwords) => void;
  context: Partial<SignupValues>;
};

const PasswordStepFunnel = ({ onNext, context }: PasswordStepFunnelProps) => {
  const { control, getValues, trigger } = useFormContext<SignupValues>();

  const handleOnClick = async () => {
    const isValid = await trigger(['password', 'passwordConfirm']);

    if (isValid) {
      onNext({
        password: getValues('password'),
        passwordConfirm: getValues('passwordConfirm'),
      });
    }
  };

  return (
    <>
      <input value={context.email} disabled />
      <Form.Field
        control={control}
        name="password"
        render={({ field, formState }) => {
          return (
            <>
              <Form.Control
                field={field}
                placeholder="비밀번호를 입력해주세요"
              />
              <Form.ErrorMessage
                errorMessage={formState.errors.password?.message}
              />
            </>
          );
        }}
      />
      <Form.Field
        control={control}
        name="passwordConfirm"
        render={({ field, formState }) => {
          return (
            <>
              <Form.Control
                field={field}
                placeholder="비밀번호를 입력해주세요"
              />
              <Form.ErrorMessage
                errorMessage={formState.errors.passwordConfirm?.message}
              />
            </>
          );
        }}
      />
      <Button onClick={handleOnClick}>닉네임 설정</Button>
    </>
  );
};

export default PasswordStepFunnel;
