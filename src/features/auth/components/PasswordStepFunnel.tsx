import { useFormContext } from 'react-hook-form';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';
import SignupLayout from '@/shared/layout/SignupLayout';
import PasswordInput from '@/shared/components/PasswordInput';

type PasswordStepFunnelProps = {
  funnelIndex: number;
};

const PasswordStepFunnel = ({ funnelIndex }: PasswordStepFunnelProps) => {
  const { control } = useFormContext<SignupValues>();

  return (
    <BottomFixedLayout
      renderBottom={() => <Button type="submit">Nari 시작하기</Button>}
    >
      <SignupLayout
        title="시용하실 비밀번호를
        설정해주세요."
        index={funnelIndex}
      >
        <Form.Field
          control={control}
          name="password"
          render={({ field, formState }) => {
            return (
              <div className="flex flex-col w-full items-center pb-2">
                <Form.Control>
                  <PasswordInput
                    {...field}
                    placeholder="비밀번호 설정"
                    type="password"
                  />
                </Form.Control>
                <Form.ErrorMessage
                  errorMessage={formState.errors.password?.message}
                />
              </div>
            );
          }}
        />
        <Form.Field
          control={control}
          name="passwordConfirm"
          render={({ field, formState }) => {
            return (
              <div className="flex flex-col w-full items-center">
                <Form.Control>
                  <PasswordInput
                    {...field}
                    placeholder="비밀번호 재확인"
                    type="password"
                  />
                </Form.Control>
                <Form.ErrorMessage
                  errorMessage={formState.errors.passwordConfirm?.message}
                />
              </div>
            );
          }}
        />
      </SignupLayout>
    </BottomFixedLayout>
  );
};

export default PasswordStepFunnel;
