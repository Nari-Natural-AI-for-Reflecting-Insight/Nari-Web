import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignupMutation from '@/features/auth/hooks/useSignupMutation';
import { SignupInputs, signupSchema } from '@/features/auth/schema';

const Signup = () => {
  const signupMutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="이메일을 입력해주세요" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        autoComplete="current-username"
        placeholder="닉네임을 입력해주세요"
        {...register('nickname')}
      />
      {errors.nickname && <p>{errors.nickname.message}</p>}
      <input
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해주세요"
        {...register('password')}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input type="submit" />
    </form>
  );
};

export default Signup;
