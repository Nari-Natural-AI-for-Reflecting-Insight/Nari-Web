import { useFormContext } from 'react-hook-form';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

const NicknameStepFunnel = () => {
  const { control } = useFormContext<SignupValues>();

  return (
    <>
      <h2>이제 마지막 단계예요!</h2>
      <Form.Field
        control={control}
        name="nickname"
        render={({ field, formState }) => (
          <>
            <Form.Control field={field} placeholder="닉네임을 입력해주세요" />
            <Form.ErrorMessage
              errorMessage={formState.errors.nickname?.message}
            />
          </>
        )}
      />
      <Button type="submit">nari 시작하기</Button>
    </>
  );
};

export default NicknameStepFunnel;
