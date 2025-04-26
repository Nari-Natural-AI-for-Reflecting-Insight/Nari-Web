import { SubmitHandler, useForm } from 'react-hook-form';
import useSignupMutation from '@/features/auth/hooks/useSignupMutation';

type Inputs = {
  email: string;
  password: string;
  nickname: string;
};

const Signup = () => {
  const signupMutation = useSignupMutation();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signupMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        {...register('email')}
      />
      <input
        type="text"
        autoComplete="current-username"
        placeholder="닉네임을 입력해주세요"
        {...register('nickname')}
      />
      <input
        type="password"
        autoComplete="current-password"
        placeholder="비밀번호를 입력해주세요"
        {...register('password')}
      />
      <input type="submit" />
    </form>
  );
};

export default Signup;
