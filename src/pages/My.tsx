import { useState } from 'react';
import DeleteAccountModal from '@/features/my/components/DeleteAccountModal';
import PasswordChangeModal from '@/features/my/components/PasswordChangeModal';
import BottomNavigation from '@/shared/components/BottomNavigation';
import { MenuListGroup } from '@/shared/components/MenuListGroup';

const My = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const AdvancedMenuItems = [
    {
      label: '개인 정보',
      onClick: () => console.log('개인 정보 클릭'),
    },
    {
      label: '결제',
      onClick: () => console.log('결제 클릭'),
    },
    {
      label: '비밀번호 변경',
      onClick: () => setIsChangePasswordOpen(true),
    },
  ];
  const logoutMenuItems = [
    {
      label: '로그아웃',
      onClick: () => console.log('개인 정보 클릭'),
    },
  ];

  const basicMenuItems = [
    {
      label: '공지사항',
      onClick: () => console.log('개인 정보 클릭'),
    },
    {
      label: '문의 및 상담',
      onClick: () => console.log('결제 클릭'),
    },
    {
      label: '자주하는 질문',
      onClick: () => console.log('비밀번호 변경 클릭'),
    },
    {
      label: '약관 및 정책',
      onClick: () => console.log('비밀번호 변경 클릭'),
    },
    {
      label: '회원 탈퇴',
      onClick: () => setIsDeleteAccountOpen(true),
    },
  ];

  return (
    <>
      <div className="text-white font-kbo flex flex-col h-full justify-evenly pb-[108px]">
        <div className="flex flex-col items-center gap-2">
          <h1>MY</h1>
          <div className="w-[96px] h-[96px] rounded-full bg-amber-200" />
          <span>마이러블리나리 님</span>
        </div>
        <div className="flex flex-col gap-3 px-4">
          <MenuListGroup items={AdvancedMenuItems} />
          <MenuListGroup items={logoutMenuItems} />
          <MenuListGroup items={basicMenuItems} />
        </div>
        <BottomNavigation />
      </div>

      <PasswordChangeModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
      <DeleteAccountModal
        open={isDeleteAccountOpen}
        onOpenChange={setIsDeleteAccountOpen}
      />
    </>
  );
};

export default My;
