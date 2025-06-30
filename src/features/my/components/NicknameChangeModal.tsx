import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RadixDialog from '@radix-ui/react-dialog';
import { z } from 'zod';
import { nicknameField } from '@/features/auth/validation/schema';
import useChangeNicknameMutation from '@/features/my/hooks/useChangeNicknameMutation';
import { Form } from '@/shared/components/form';

type NicknameChangeModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const NicknameChangeModal = ({
  open,
  onOpenChange,
}: NicknameChangeModalProps) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(z.object({ newNickname: nicknameField })),
    mode: 'onChange',
  });
  const { mutate: changeNicknameMutate } = useChangeNicknameMutation();

  const onSubmit: SubmitHandler<{ newNickname: string }> = (data) => {
    changeNicknameMutate(data);
  };

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="">
          <RadixDialog.Title>닉네임 변경</RadixDialog.Title>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start"
          >
            <Form.Field
              control={control}
              name="newNickname"
              render={({ field, formState }) => (
                <>
                  <Form.Control
                    field={field}
                    placeholder="새로운 닉네임을 입력해주세요"
                  />
                  <Form.ErrorMessage
                    errorMessage={formState.errors.newNickname?.message}
                  />
                </>
              )}
            />
            <input type="submit" />
          </form>
        </RadixDialog.Content>
        <RadixDialog.Close />
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default NicknameChangeModal;
