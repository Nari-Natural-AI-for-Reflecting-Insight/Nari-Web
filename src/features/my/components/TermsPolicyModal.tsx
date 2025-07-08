import { Dispatch, SetStateAction } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Header from '@/shared/components/Header';

type TermsPolicyModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const TermsPolicyModal = ({ open, onOpenChange }: TermsPolicyModalProps) => {
  return (
    <RadixDialog.Root modal open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Content className="fixed left-1/2 inset-0 -translate-x-1/2 w-full max-w-md h-screen overflow-auto bg-[#161820] p-5 text-white">
          <Header title="약관 및 정책" onClick={() => onOpenChange(false)} />
          <section id="terms">
            <h2>이용약관</h2>

            <h3>제1조 (목적)</h3>
            <p>
              이 약관은 <strong>[회사명]</strong>이 제공하는{' '}
              <strong>[서비스명]</strong>의 이용조건·절차, 이용자의
              권리·의무·책임사항 등을 규정함을 목적으로 합니다.
            </p>

            <h3>제2조 (정의)</h3>
            <ul>
              <li>
                <strong>서비스</strong>: 회사가 제공하는 모든 디지털
                서비스(앱·웹 포함)
              </li>
              <li>
                <strong>회원</strong>: 회사에 개인정보를 제공하여 회원등록을 한
                자
              </li>
              <li>
                <strong>비회원</strong>: 회원가입 없이 서비스를 이용하는 자
              </li>
            </ul>

            <h3>제3조 (약관의 게시·개정)</h3>
            <ul>
              <li>회사는 이 약관을 앱 초기화면 및 웹페이지에 게시합니다.</li>
              <li>
                관련법을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정 시
                적용일자·사유를 공지합니다.
              </li>
            </ul>

            <h3>제4조 (서비스 제공 및 변경)</h3>
            <ul>
              <li>
                회사는 다음과 같은 기능을 제공합니다:
                <ul>
                  <li>핵심 기능 A, B, C</li>
                </ul>
              </li>
              <li>
                중요 변경 시 사전 공지하며, 불가피한 경우 예고 없이 일시 중단할
                수 있습니다.
              </li>
            </ul>

            <h3>제5조 (회원가입 및 탈퇴)</h3>
            <ul>
              <li>가입: 앱 내 ‘회원가입’ 절차 진행</li>
              <li>탈퇴: 앱 설정에서 언제든 탈퇴 가능</li>
            </ul>

            <h3>제6조 (계약의 성립)</h3>
            <p>
              회원이 유료 기능의 ‘구매’ 또는 ‘결제’ 버튼을 클릭하면 계약이
              성립됩니다.
            </p>

            <h3>제7조 (서비스 이용)</h3>
            <ul>
              <li>회원은 본 약관·공지사항·법령을 준수해야 합니다.</li>
              <li>
                서비스는 연중무휴 제공하나, 기술적·업무적 사유로 일시 중단될 수
                있습니다.
              </li>
            </ul>

            <h3>제8조 (저작권)</h3>
            <p>
              서비스 내 모든 저작물은 회사에 귀속되며, 무단 복제·배포를
              금지합니다.
            </p>

            <h3>제9조 (이용 제한 및 해지)</h3>
            <ul>
              <li>약관 위반·서비스 방해 시 이용 제한 또는 계약 해지 가능</li>
              <li>절차 및 사유를 사전 공지합니다.</li>
            </ul>

            <h3>제10조 (책임 제한)</h3>
            <ul>
              <li>
                천재지변 등 불가항력적 사유로 인한 장애에 대해 책임을 지지
                않습니다.
              </li>
              <li>
                회원이 서비스 이용 중 입은 손해는 회사가 책임지지 않습니다.
              </li>
            </ul>

            <h3>제11조 (준거법 및 재판관할)</h3>
            <p>
              본 약관은 대한민국 법령을 준거법으로 하며, 분쟁 시 회사 소재지
              관할 법원을 제1심 법원으로 합니다.
            </p>
          </section>

          <section id="privacy">
            <h2>개인정보 처리방침</h2>

            <h3>제1조 (수집하는 개인정보 항목)</h3>
            <ul>
              <li>
                <strong>필수</strong>: 이름, 이메일, 휴대전화번호
              </li>
              <li>
                <strong>선택</strong>: 생년월일, 주소 등
              </li>
            </ul>

            <h3>제2조 (수집 방법)</h3>
            <p>회원가입, 서비스 이용, 이벤트 응모 시 이용자가 직접 입력</p>

            <h3>제3조 (수집 및 이용 목적)</h3>
            <ol>
              <li>서비스 제공·이행(회원 관리, 결제 처리)</li>
              <li>고객 문의·불만 처리</li>
              <li>마케팅·광고 활용(이용자 동의 시)</li>
            </ol>

            <h3>제4조 (보유 및 이용 기간)</h3>
            <p>
              목적 달성 후 즉시 파기하며, 법령상 보존 의무가 있는 경우 해당 기간
              동안 보관합니다.
            </p>

            <h3>제5조 (제3자 제공)</h3>
            <p>
              이용자 동의 없이 개인정보를 제3자에게 제공하지 않으며, 법령 예외
              사항은 제외합니다.
            </p>

            <h3>제6조 (처리 위탁)</h3>
            <p>
              결제 처리·푸시 알림·메일 발송 등 외부 업체 위탁 시, 위탁 내용 및
              업체를 명시합니다.
            </p>

            <h3>제7조 (파기 절차 및 방법)</h3>
            <ul>
              <li>
                <strong>절차</strong>: 내부 방침에 따라 대상 선정 → 파기
              </li>
              <li>
                <strong>방법</strong>: 전자파일 복구 불가능 삭제, 종이 문서 분쇄
              </li>
            </ul>

            <h3>제8조 (이용자 권리 및 행사 방법)</h3>
            <p>
              언제든 개인정보 조회·수정·삭제·처리 정지를 요청할 수 있으며,
              회사는 지체 없이 처리합니다.
            </p>

            <h3>제9조 (책임 및 안전조치)</h3>
            <p>SSL 암호화·접근 통제 등 기술적·관리적 보호조치를 수행합니다.</p>

            <h3>제10조 (정책 변경)</h3>
            <p>방침 변경 시 앱 내 공지 및 이메일·푸시 알림으로 고지합니다.</p>
          </section>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default TermsPolicyModal;
