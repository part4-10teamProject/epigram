'use client';
/**
 * @isOpen - 모달의 표시여부를 나타냄
 * @onClose - 모달을 닫는 함수로 배경 클릭하면 호출됨
 * @icon - 모달창에 들어갈 이미지를 작성 (작성해도되고 안해도됨)
 * @message - 모달창에 들어갈 타이틀
 * @content - 모달창에 들어갈 내용 (작성해도되고 안해도됨)
 * @buttons - 모달창에 들어갈 버튼
 * 
 * 사용예제
 * 
 * 일단 모달창을 사용하는 페이지에서 모달창의 상태를 관리해야하는 변수를 선언해야한다.
 * 처음에는 두 개의 모달 모두 false로 둔 상태에서 특정 이벤트를 사용해서 true로 바꾸게 되면 모달창을 띄울 수 있게됨
 * const [isModal, setIsModal] = useState(false);
 * const [successModal, setSuccessModal] = useState(false);
 * 
 * <Modal
      isOpen={isModal}
      onClose={() => setIsModal(false)}
      icon={<Image src={exclamation} alt="모달이미지" />}
      message="댓글을 삭제하시겠어요?"
      content="댓글은 삭제 후 복구할 수 없어요"
      buttons={[
        {
          text: '취소',
          onClick: () => setIsModal(false),
          type: 'secondary',
        },
        {
          text: '삭제하기',
          onClick: () => {
            setIsModal(false);
            setSuccessModal(true);
          },

          type: 'primary',
        },
      ]}
    />
    <Modal
      isOpen={successModal}
      onClose={() => setSuccessModal(false)}
      message="댓글을 삭제하였습니다"
      buttons={[
        {
          text: '확인',
          onClick: () => setSuccessModal(false),
        },
      ]}
    />
 * 
 * 
 */

import { ModalProps } from '@/types/modal';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  icon,
  message,
  content,
  buttons,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black-950/60"
      onClick={onClose}
    >
      <div
        className="w-[320px] rounded-[24px] bg-white px-[38px] py-[40px] text-center md:w-[372px] xl:w-[452px]"
        onClick={(e) => e.stopPropagation()}
      >
        {icon && (
          <div className="m-auto mb-4 h-11 w-11 md:mb-6 xl:h-14 xl:w-14">
            {icon}
          </div>
        )}
        <div>
          <div className="mb-[24px] md:mb-[36px] xl:mb-[40px]">
            <h1 className="text-black mb-3 text-xl font-semibold md:text-2xl xl:text-[24px]">
              {message}
            </h1>
            {content && (
              <p className="text-xl text-gray-400 md:text-xl xl:text-[18px]">
                {content}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            {buttons.map((button, index) => (
              <button
                className={`w-full rounded-[12px] p-4 text-xl xl:text-2xl ${button.type === 'primary' ? `bg-blue-900 text-white` : button.type === 'secondary' ? `text-black bg-blue-200` : `bg-blue-900 text-white`}`}
                key={index}
                onClick={button.onClick}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
