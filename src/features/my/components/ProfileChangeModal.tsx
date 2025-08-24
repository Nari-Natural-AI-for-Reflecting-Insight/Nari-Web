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
          <div className="w-full h-screen flex flex-col px-9 gap-18">
            <section className="flex grow-1 flex-col justify-center">
              {' '}
              <p className="font-kbo pb-5">프로필 설정하기</p>
              <div className="flex items-center w-full gap-9">
                <div className="w-[96px] h-[96px] rounded-full bg-amber-200" />
                <p className="text-2xl font-medium">{data?.data.nickname}</p>
              </div>
              <form
                className="flex w-full justify-center pt-7"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="w-full max-w-[280px] h-[34px] relative">
                  <Form.Field
                    control={control}
                    name="nickname"
                    render={({ field, formState }) => {
                      return (
                        <>
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
                        </>
                      );
                    }}
                  />
                  <button
                    type="submit"
                    className="text-xs underline text-[#AAAAAA]/[0.6] absolute right-0 bottom-2"
                  >
                    변경하기
                  </button>
                </div>
              </form>
            </section>
            <section className="grow-2">
              <p className="font-kbo pb-5">나리 캐릭터 고르기</p>
              <div className="flex items-center justify-around gap-6">
                <img src="public/icons/leftArrow.svg" />
                <img
                  className="w-[250px] h-[250px]"
                  src="public/images/nari-standard.svg"
                />
                <img className=" rotate-180" src="public/icons/leftArrow.svg" />
              </div>
            </section>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default ProfileChangeModal;
