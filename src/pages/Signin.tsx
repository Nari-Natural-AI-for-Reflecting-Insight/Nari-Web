import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSigninMutation from '@/features/auth/hooks/useSigninMutations';
import { signinSchema, SigninValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';

const Signin = () => {
  const { mutate: signinMutate } = useSigninMutation();
  const { handleSubmit, control } = useForm<SigninValues>({
    mode: 'onChange',
    resolver: zodResolver(signinSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit: SubmitHandler<SigninValues> = (data) => {
    signinMutate(data);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-center font-kbo text-2xl pb-12">
        나만의 리스너
        <span className="font-mochiy block">Nari</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-28"
      >
        <div className="w-full flex flex-col items-center justify-center gap-1.5 grow-2">
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
                <Form.ErrorMessage
                  errorMessage={formState.errors.email?.message}
                />
              </>
            )}
          />
          <Form.Field
            control={control}
            name="password"
            render={({ field, formState }) => (
              <>
                <Form.Control
                  field={field}
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  autoComplete="current-password"
                />
                <Form.ErrorMessage
                  errorMessage={formState.errors.password?.message}
                />
              </>
            )}
          />
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit">Nari 시작하기</Button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
