function TextAreaSolid() {
  return (
    <form>
        <span className="block text-sm font-medium text-slate-700">에피그램생성</span>
        <label className="block h-[132px] w-[312px] border rounded-xl pt-[10px] pr-4 pb-[10px] pl-4 gap-2 top-5 left-5">
    
        <textarea
          typeof="text" 
          id="내용"
          maxLength={500}
          rows={15}
          placeholder="500자 이내로 입력해주세요"
          className="peer w-[280px] h-[26px] font-normal text-xl leading-[26px]">
        </textarea>
        </ label>
        <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
          500자 이내로 입력해주세요.
        </p>
    </form>
  );
}

export default TextAreaSolid;