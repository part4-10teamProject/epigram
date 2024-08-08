'use client';

const AddEpigramSource: React.FC = () => {
  return (
    <div className="h-[200px] w-[640px] gap-6">
      <div>
        <p className="w-[600px] text-[20px] leading-8"> 출처 </p>
      </div>
      <div className="pt-[30px]">
        <label>
          <input
            className="h-[64px] w-[640px] gap-2 rounded-lg border pl-3"
            placeholder="출처 제목 입력"
            name=""
            type="text"
          ></input>
        </label>
      </div>
      <div className="pt-[20px]">
        <label>
          <input
            className="h-[64px] w-[640px] gap-2 rounded-lg border pl-3"
            placeholder="URL (ex. https://www.website.com)"
            name=""
            type="text"
          ></input>
        </label>
      </div>
    </div>
  );
};

export default AddEpigramSource;
