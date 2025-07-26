import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Header from '@/shared/components/Header';
import { userQueryOption } from '@/features/auth/apis/queryOption';
import { useQuery } from '@tanstack/react-query';
import { Form } from '@/shared/components/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeNicknameSchema } from '../validation/schema';
import useChangeNicknameMutation from '../hooks/useChangeNicknameMutation';

type ProfileChangeModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const ProfileChangeModal = ({
  open,
  onOpenChange,
}: ProfileChangeModalProps) => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(changeNicknameSchema),
    mode: 'onChange',
  });

  const { mutate: changeNicknameMutate } = useChangeNicknameMutation();
  const { data } = useQuery(userQueryOption.all());

  const onSubmit: SubmitHandler<{ nickname: string }> = (data) => {
    const { nickname } = data;
    changeNicknameMutate({ newNickname: nickname });
  };

  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="max-w-md bg-[#161820] fixed left-1/2 top-0 -translate-x-1/2 h-full w-full text-white px-3">
          <Header onClick={() => onOpenChange(false)} title="프로필 설정" />
          <div className="w-full h-screen flex flex-col items-center">
            <section className="flex flex-col grow-1 justify-center items-center w-full gap-6">
              <p className="pr-50">프로필 설정하기</p>
              <div className="flex flex-col gap-5">
                <div className="flex items-center w-full">
                  <div className="w-[96px] h-[96px] rounded-full bg-amber-200" />
                  <p className="pl-8 text-2xl font-medium">
                    {data?.data.nickname}
                  </p>
                </div>
                <form
                  className="relative w-[280px] h-[34px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Form.Field
                    control={control}
                    name="nickname"
                    render={({ field, formState }) => {
                      return (
                        <div className="w-full">
                          <input
                            {...field}
                            placeholder="닉네임 변경하기"
                            className="border-b 
                            h-[34px] focus:outline-none w-full border-[#60554F]"
                          />
                          <Form.ErrorMessage
                            className="pr-0"
                            errorMessage={formState.errors.nickname?.message}
                          />
                        </div>
                      );
                    }}
                  />

                  <button
                    type="submit"
                    className="text-xs underline text-[#AAAAAA]/[0.6] absolute right-0 bottom-2"
                  >
                    변경하기
                  </button>
                </form>
              </div>
            </section>

            <section className="grow-2">
              <p>나리 캐릭터 고르기</p>
              <div className="flex items-center justify-around gap-6">
                <p>&lt;</p>
                <img
                  className="w-[250px] h-[250px]"
                  src="public/images/nari-standard.svg"
                />
                <p>&gt;</p>
              </div>
            </section>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default ProfileChangeModal;
