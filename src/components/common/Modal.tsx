interface ModalProps {
  message: string;
}

export const Modal: React.FC<ModalProps> = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/60 text-white">
      <div className="w-96 rounded-[12px] bg-white px-[38px] py-[40px] text-center">
        <div>
          <h1 className="mb-[40px] text-2xl font-semibold text-black">
            {message}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <button className="w-full rounded-xl bg-[#ECEFF4] p-4 text-xl text-black">
              취소
            </button>
            <button className="w-full rounded-xl bg-[#FF6577] p-4 text-xl text-white">
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
