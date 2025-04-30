import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignupMutation from '@/features/auth/hooks/useSignupMutation';
import { SignupValues, signupSchema } from '@/features/auth/schema';
import { Form } from '@/shared/components/form';

const Signup = () => {
  const signupMutation = useSignupMutation();
  const { handleSubmit, control } = useForm<SignupValues>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
    defaultValues: { email: '', password: '', nickname: '' },
  });

  const onSubmit: SubmitHandler<SignupValues> = (data) => {
    signupMutation.mutate(data);
    // todo : error 처리
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start"
    >
      <Form.Field
        control={control}
        name="email"
        render={({ field, formState }) => (
          <>
            <Form.Label>이메일</Form.Label>
            <Form.Control field={field} placeholder="이메일을 입력해주세요" />
            <Form.ErrorMessage errorMessage={formState.errors.email?.message} />
          </>
        )}
      />
      <Form.Field
        control={control}
        name="password"
        render={({ field, formState }) => (
          <>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              field={field}
              placeholder="비밀번호를 입력해주세요"
              type="password"
            />
            <Form.ErrorMessage
              errorMessage={formState.errors.password?.message}
            />
          </>
        )}
      />
      <Form.Field
        control={control}
        name="nickname"
        render={({ field, formState }) => (
          <>
            <Form.Label>닉네임</Form.Label>
            <Form.Control field={field} placeholder="닉네임을 입력해주세요" />
            <Form.ErrorMessage
              errorMessage={formState.errors.nickname?.message}
            />
          </>
        )}
      />
      <input type="submit" />
    </form>
  );
};

export default Signup;
