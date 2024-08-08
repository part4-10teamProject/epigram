'use client';

const AddEpigramTag: React.FC = () => {
  return (
    <div className="h-[120px] w-[640px] gap-6">
      <div>
        <p className="w-[600px] text-[20px] leading-8"> 태그 </p>
      </div>
      <div className="pt-[30px]">
        <label>
          <input
            className="h-[64px] w-[640px] gap-2 rounded-lg border pl-3"
            placeholder="입력하여 태그 작성 (최대 10자)"
            name=""
            type="text"
          ></input>
        </label>
      </div>
    </div>
  );
};

export default AddEpigramTag;
