import { useFormContext } from 'react-hook-form';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

const PasswordStepFunnel = () => {
  const { control } = useFormContext<SignupValues>();

  return (
    <>
      <div className="grow-2 flex flex-col w-full items-center gap-1.5">
        <Form.Field
          control={control}
          name="password"
          render={({ field, formState }) => {
            return (
              <>
                <Form.Control
                  field={field}
                  placeholder="비밀번호 설정"
                  type="password"
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
                  placeholder="비밀번호 재확인"
                  type="password"
                />
                <Form.ErrorMessage
                  errorMessage={formState.errors.passwordConfirm?.message}
                />
              </>
            );
          }}
        />
      </div>
      <div className="grow-1 flex flex-col w-full items-center">
        <Button type="submit" className="grow-1">
          다음
        </Button>
      </div>
    </>
  );
};

export default PasswordStepFunnel;
