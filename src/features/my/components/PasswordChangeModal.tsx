import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RadixDialog from '@radix-ui/react-dialog';
import { z } from 'zod';
import { passwordField } from '@/features/auth/validation/schema';
import useChangePasswordMutation from '@/features/my/hooks/useChangePasswordMutation';
import { Form } from '@/shared/components/form';
import Header from '@/shared/components/Header';
import PasswordInput from '@/shared/components/PasswordInput';
import BottomFixedLayout from '@/shared/layout/BottomFixedLayout';

type PasswordChangeModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const PasswordChangeModal = ({
  open,
  onOpenChange,
}: PasswordChangeModalProps) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(
      z.object({ oldPassword: passwordField, newPassword: passwordField }),
    ),
    mode: 'onChange',
  });
  const { mutate: changePasswordMutate } = useChangePasswordMutation();

  const onSubmit: SubmitHandler<{
    oldPassword: string;
    newPassword: string;
  }> = (data) => {
    changePasswordMutate(data);
  };

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full px-3">
          <Header title="개인 정보" onClick={() => onOpenChange(false)} />
          <BottomFixedLayout
            className="px-0"
            renderBottom={() => (
              <button
                type="submit"
                className="text-white rounded-4xl bg-amber-500 w-64 text-2xl h-14"
              >
                수정 완료
              </button>
            )}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col h-full justify-around items-center"
            >
              <div className="w-full flex flex-col gap-3">
                <span className="text-white px-3 font-kbo">비밀번호 변경</span>
                <div className="flex flex-col bg-[#22252E] rounded-3xl w-full h-60 justify-center items-center gap-4">
                  <Form.Field
                    control={control}
                    name="oldPassword"
                    render={({ field, formState }) => {
                      return (
                        <div className="w-full flex flex-col items-center">
                          <Form.Label className="text-white text-left w-full pl-7 pb-1 text-sm">
                            기존 비밀번호
                          </Form.Label>
                          <Form.Control>
                            <PasswordInput
                              {...field}
                              placeholder="기존 비밀번호를 입력해주세요"
                              type="password"
                              className="bg-[#1C1D23]"
                            />
                          </Form.Control>
                          <Form.ErrorMessage
                            errorMessage={formState.errors.oldPassword?.message}
                          />
                        </div>
                      );
                    }}
                  />
                  <Form.Field
                    control={control}
                    name="newPassword"
                    render={({ field, formState }) => {
                      return (
                        <div className="w-full flex flex-col items-center">
                          <Form.Label className="text-white text-left w-full pl-7 pb-1 text-sm">
                            신규 비밀번호
                          </Form.Label>
                          <Form.Control>
                            <PasswordInput
                              {...field}
                              placeholder="새로운 비밀번호를 입력해주세요"
                              type="password"
                              className="bg-[#1C1D23]"
                            />
                          </Form.Control>
                          <Form.ErrorMessage
                            errorMessage={formState.errors.newPassword?.message}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
              </div>
            </form>
          </BottomFixedLayout>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default PasswordChangeModal;
