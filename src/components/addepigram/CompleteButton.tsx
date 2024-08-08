'use client';

const CompleteButton: React.FC = () => {
  return (
    <form>
      <button
        className="text-black h-[64px] w-[640px] rounded-lg border bg-slate-300 hover:text-white"
        type="submit"
        name="complete"
      >
        작성 완료
      </button>
    </form>
  );
};

export default CompleteButton;
