import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RadixDialog from '@radix-ui/react-dialog';
import { z } from 'zod';
import { passwordField } from '@/features/auth/validation/schema';
import useChangePasswordMutation from '@/features/my/hooks/useChangePasswordMutation';
import { Form } from '@/shared/components/form';

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
        <RadixDialog.Content className="fixed inset-0  bg-white">
          <RadixDialog.Title>비밀번호 변경</RadixDialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start"
          >
            <Form.Field
              control={control}
              name="oldPassword"
              render={({ field, formState }) => {
                return (
                  <>
                    <Form.Control
                      field={field}
                      placeholder="기존 비밀번호를 입력해주세요"
                      type="password"
                    />
                    <Form.ErrorMessage
                      errorMessage={formState.errors.oldPassword?.message}
                    />
                  </>
                );
              }}
            />
            <Form.Field
              control={control}
              name="newPassword"
              render={({ field, formState }) => {
                return (
                  <>
                    <Form.Control
                      field={field}
                      placeholder="새로운 비밀번호를 입력해주세요"
                      type="password"
                    />
                    <Form.ErrorMessage
                      errorMessage={formState.errors.newPassword?.message}
                    />
                  </>
                );
              }}
            />
            <input type="submit" />
          </form>
        </RadixDialog.Content>
        <RadixDialog.Close />
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default PasswordChangeModal;
