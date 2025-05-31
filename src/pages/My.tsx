import { useState } from 'react';
import NicknameChangeModal from '@/features/my/components/NicknameChangeModal';
import PasswordChangeModal from '@/features/my/components/PasswordChangeModal';
import useDeleteAccountMutation from '@/features/my/hooks/useDeleteAccountMutation';
import Button from '@/shared/components/Button';
import Dialog from '@/shared/components/Dialog';

const My = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isChangeNicknameOpen, setIsChangeNicknameOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const { mutate: deleteAccountMutate } = useDeleteAccountMutation();

  return (
    <>
      <Button onClick={() => setIsChangePasswordOpen(true)}>
        비밀번호 변경
      </Button>
      <Button onClick={() => setIsChangeNicknameOpen(true)}>닉네임 수정</Button>
      <Button onClick={() => setIsDeleteOpen(true)}>회원 탈퇴</Button>
      <Dialog
        description="정말로 탈퇴하시겠습니까?"
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onLeftButtonClick={() => {
          deleteAccountMutate();
        }}
      />
      <NicknameChangeModal
        open={isChangeNicknameOpen}
        onOpenChange={setIsChangeNicknameOpen}
      />
      <PasswordChangeModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </>
  );
};

export default My;
