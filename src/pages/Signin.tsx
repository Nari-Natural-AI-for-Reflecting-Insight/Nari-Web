import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useSigninMutation from "@/features/auth/hooks/useSigninMutations";
import { SigninValues, signinSchema } from '@/features/auth/schema';
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
                        <Form.Control
                            field={field}
                            placeholder="이메일을 입력해주세요"
                            autoComplete="current-email"
                        />
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
                            autoComplete="current-password"
                        />
                        <Form.ErrorMessage
                            errorMessage={formState.errors.password?.message}
                        />
                    </>
                )}
            />
            <input type="submit" value="로그인" />
        </form>
    );
};

export default Signin;
