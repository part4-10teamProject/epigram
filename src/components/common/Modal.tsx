interface ButtonProps {
  text: string;
  onClick: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttons: ButtonProps[];
}

/**
 * @isOpen - 모달의 표시여부를 나타냄
 * @onClose - 모달을 닫는 함수로 배경 클릭하면 호출됨
 * @message - 모달창에 들어갈 메시지
 * @buttons - 모달창에 들어갈 버튼
 */

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  buttons,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/60 text-white"
      onClick={onClose}
    >
      <div
        className="w-96 rounded-[12px] bg-white px-[38px] py-[40px] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="mb-[40px] text-2xl font-semibold text-black">
            {message}
          </h1>
          <div className="flex items-center justify-center gap-4">
            {buttons.map((button, index) => (
              <button
                className="w-full rounded-[12px] bg-slate-800 p-4 text-xl text-orange-600"
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
