import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userQueryOption } from '@/features/auth/apis/queryOption';
import DeleteAccountModal from '@/features/my/components/DeleteAccountModal';
import PasswordChangeModal from '@/features/my/components/PasswordChangeModal';
import PersonalInfoModal from '@/features/my/components/PersonalInfoModal';
import ProfileChangeModal from '@/features/my/components/ProfileChangeModal';
import TermsPolicyModal from '@/features/my/components/TermsPolicyModal';
import BottomNavigation from '@/shared/components/BottomNavigation';
import CreditBox from '@/shared/components/CreditBox';
import { MenuListGroup } from '@/shared/components/MenuListGroup';
import { toast } from 'sonner';
import Header from '@/shared/components/Header';

const My = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [isTermsPolicyModalOpen, setIsTermsPolicyModalOpen] = useState(false);
  const [isProfileChangeModalOpen, setIsProfileChangeModalOpen] =
    useState(false);
  const [isPersonalInfoChangeModalOpen, setIsPersonalInfoChangeModalOpen] =
    useState(false);

  const { data } = useQuery(userQueryOption.all());

  const AdvancedMenuItems = [
    {
      label: '개인 정보',
      onClick: () => setIsPersonalInfoChangeModalOpen(true),
    },
    {
      label: '결제',
      onClick: () => toast.info('아직 준비 중이에요, 조금만 기다려주세요!🚀'),
    },
    {
      label: '비밀번호 변경',
      onClick: () => setIsChangePasswordOpen(true),
    },
  ];
  const logoutMenuItems = [
    {
      label: '로그아웃',
      onClick: () => toast.info('아직 준비 중이에요, 조금만 기다려주세요!🚀'),
    },
  ];

  const basicMenuItems = [
    {
      label: '공지사항',
      onClick: () => toast.info('아직 준비 중이에요, 조금만 기다려주세요!🚀'),
    },
    {
      label: '문의 및 상담',
      onClick: () => toast.info('아직 준비 중이에요, 조금만 기다려주세요!🚀'),
    },
    {
      label: '자주하는 질문',
      onClick: () => toast.info('아직 준비 중이에요, 조금만 기다려주세요!🚀'),
    },
    {
      label: '약관 및 정책',
      onClick: () => setIsTermsPolicyModalOpen(true),
    },
    {
      label: '회원 탈퇴',
      onClick: () => setIsDeleteAccountOpen(true),
    },
  ];

  return (
    <>
      <div className="text-white font-kbo flex flex-col h-full overflow-y-scroll">
        <div className="flex flex-col items-center gap-10 pb-10">
          <div className="flex items-center pl-16">
            <Header title="MY" hasBackIcon={false} />
            <CreditBox
              className="w-1/3 ml-5"
              credit={data?.data.currentCreditAmount || 0}
            />
          </div>
          <div className="flex flex-col gap-4 items-center">
            <div className="w-[96px] h-[96px] rounded-full bg-amber-200" />
            <div className="flex gap-3">
              <p className="font-kbo text-2xl font-medium">
                {data?.data.nickname}
                <span className="font-kbo font-light text-xl">님</span>
              </p>
              <img
                className="w-6 h-auto cursor-pointer"
                src="public/icons/setting.svg"
                alt="diary"
                onClick={() => setIsProfileChangeModalOpen(true)}
              />
            </div>
          </div>
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
      <TermsPolicyModal
        open={isTermsPolicyModalOpen}
        onOpenChange={setIsTermsPolicyModalOpen}
      />
      <ProfileChangeModal
        open={isProfileChangeModalOpen}
        onOpenChange={setIsProfileChangeModalOpen}
      />
      <PersonalInfoModal
        open={isPersonalInfoChangeModalOpen}
        onOpenChange={setIsPersonalInfoChangeModalOpen}
      />
    </>
  );
};

export default My;
