import { useFormContext } from 'react-hook-form';
import { OTPInput } from 'input-otp';
import { toast } from 'sonner';
import useEmailCodeCheckMutation from '@/features/auth/hooks/useEmailCodeCheckMutation';
import useEmailVerificationMutation from '@/features/auth/hooks/useEmailVerificationMutation';
import { SignupValues } from '@/features/auth/validation/schema';
import Button from '@/shared/components/Button';
import { Form } from '@/shared/components/form';
import Input from '@/shared/components/Input';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';
import SignupLayout from '@/shared/layout/SignupLayout';

type EmailStepFunnelProps = {
  onNext: ({
    email,
    emailCodeCheck,
  }: {
    email: string;
    emailCodeCheck: string;
  }) => void;
  funnelIndex: number;
};

const EmailStepFunnel = ({ onNext, funnelIndex }: EmailStepFunnelProps) => {
  const { control, getValues, trigger } = useFormContext<SignupValues>();
  const { mutateAsync: emailVerificationMutateAsync } =
    useEmailVerificationMutation();
  const { mutateAsync: emailCodeCheckMutateAsync } =
    useEmailCodeCheckMutation();

  const handleEmailVerificationClick = async () => {
    const isValid = await trigger('email');
    if (!isValid) {
      return;
    }

    try {
      await emailVerificationMutateAsync({ email: getValues('email') });
      toast.success('인증코드를 전송했습니다.');
    } catch {
      return;
    }
  };

  const handleEmailCodeCheckClick = async () => {
    const isValid = await trigger(['emailCodeCheck', 'email']);

    if (!isValid) {
      return;
    }

    try {
      await emailCodeCheckMutateAsync({
        email: getValues('email'),
        verificationCode: getValues('emailCodeCheck'),
      });

      onNext({
        email: getValues('email'),
        emailCodeCheck: getValues('emailCodeCheck'),
      });
    } catch {
      return;
    }
  };

  return (
    <BottomFixedLayout
      renderBottom={() => (
        <Button onClick={handleEmailCodeCheckClick}>다음</Button>
      )}
    >
      <SignupLayout
        title="NARI를 이용하기위해
            인증번호를 입력 해 주세요."
        index={funnelIndex}
      >
        <Form.Field
          control={control}
          name="email"
          render={({ field, formState }) => (
            <>
              <Form.Control>
                <Input
                  {...field}
                  placeholder="이메일 입력하기"
                  autoComplete="current-email"
                />
              </Form.Control>
              <Form.ErrorMessage
                errorMessage={formState.errors.email?.message}
              />
            </>
          )}
        />
        <button
          className="w-full text-[#C4C9C2] underline text-sm pt-1.5 pb-7 text-center"
          onClick={handleEmailVerificationClick}
        >
          인증코드 보내기
        </button>
        <Form.Field
          control={control}
          name="emailCodeCheck"
          render={({ field, formState }) => (
            <>
              <OTPInput
                {...field}
                maxLength={6}
                render={({ slots }) => (
                  <div className="flex gap-1.5">
                    {slots.slice(0, 6).map((slot, idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-[72px] text-white rounded-4xl bg-[#22252E] border border-[#22252E] flex items-center justify-center ${slot.isActive && 'bg-[#824427] border-[#FF7500]'}`}
                      >
                        {slot.char ?? slot.placeholderChar}
                      </div>
                    ))}
                  </div>
                )}
              />
              <Form.ErrorMessage
                errorMessage={formState.errors.emailCodeCheck?.message}
              />
            </>
          )}
        />
      </SignupLayout>
    </BottomFixedLayout>
  );
};

export default EmailStepFunnel;
