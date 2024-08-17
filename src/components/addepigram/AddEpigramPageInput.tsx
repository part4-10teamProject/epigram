'use client';

import { AddEpigramPost } from '@/api/Addepigramapi';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import { Addepigram } from '@/api/Addepigramapi';

const AddEpigramPageInput: React.FC = () => {
  const [tags, setTag] = useState<string[]>([]);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [referenceTitle, setReferenceTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const EpigramPostMutation = useMutation({
    mutationFn: (epigram: Addepigram) => AddEpigramPost(epigram),
    onSuccess: () => Cookies.set('isNewEpigram', 'true', { expires: 1 }),
    onError: (error) => console.error(error),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const epigram = { tags, referenceUrl, referenceTitle, author, content };

    EpigramPostMutation.mutate(epigram);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTag([...tags, value]);
  };

  const handleReferenceUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReferenceUrl(e.target.value);
  };

  const handlereferenceTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReferenceTitle(e.target.value);
  };

  const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="-translate-y-1/2left-[640px] absolute left-1/2 top-[130px] h-[1036px] w-[640px] -translate-x-1/2 transform gap-10">
        <p className="w-[640px] text-[24px] font-semibold leading-8 antialiased">
          에피그램 만들기
        </p>
        <div className="h-[207px] w-[640px] gap-6 pt-[30px]">
          <p className="w-[600px] pb-2 text-[20px] font-semibold leading-8">
            내용
            <span className="w-[500px] text-[24px] leading-8 text-red-500">
              {' '}
              ⚹{' '}
            </span>
          </p>
          <div className="pt-3">
            <label className="">
              <textarea
                name="내용"
                typeof="text"
                value={content}
                id="내용"
                maxLength={500}
                onChange={handleContentChange}
                placeholder="500자 이내로 입력해주세요"
                className="resize: none h-[132px] w-[312px] rounded-md border-2 border-blue-300 pl-2 pt-2 text-[20px] font-normal leading-[26px] group-hover:border-red-500 group-active:border-red-500 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]"
              ></textarea>

              <p
                className={`${content.length >= 500 ? 'block' : 'hidden'} mt-2 w-[312px] text-right text-sm text-pink-600 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]`}
              >
                500자 이내로 입력해주세요.
              </p>
            </label>
          </div>
        </div>
        <div className="pt-[80px]">
          <div>
            <div>
              <p className="w-[600px] pb-2 text-[20px] font-semibold leading-8">
                {' '}
                저자{' '}
                <span className="w-[500px] text-[24px] leading-8 text-red-500">
                  {' '}
                  ⚹{' '}
                </span>
              </p>
            </div>
            <div className="h-[32px] w-[333px] gap-6 pt-3">
              <label className="h-[32px] w-[107px] gap-2">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[24px] w-[24px] rounded-[40px] border-2 border-blue-300 align-middle"
                  color="black"
                />{' '}
                <span className="h-[32px] w-[75px] pl-1 align-middle text-[20px] font-medium leading-8">
                  직접 입력
                </span>
              </label>
              <label className="h-[32px] w-[111px] gap-2 pl-5">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[24px] w-[24px] rounded-[40px] border-2 border-blue-300 align-middle"
                  color="black"
                />{' '}
                <span className="h-[32px] w-[79px] pl-1 align-middle text-[20px] font-medium leading-8">
                  알 수 없음
                </span>
              </label>
              <label className="h-[32px] w-[67px] gap-2 pl-5">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[24px] w-[24px] rounded-[40px] border-2 border-blue-300 align-middle"
                  color="black"
                />{' '}
                <span className="h-[32px] w-[35px] pl-1 align-middle text-[20px] font-medium leading-8">
                  본인
                </span>
              </label>
            </div>
            <div className="pt-8">
              <input
                className="focus: peer h-[64px] w-[640px] gap-2 rounded-xl border-2 border-blue-300 pl-3 text-[20px] focus:border-red-500 active:border-red-500"
                placeholder="저자 이름 입력"
                name=""
                type="text"
                value={author}
                onChange={handleAuthorChange}
              ></input>
              <p className="invisible text-right text-[16px] font-normal leading-7 text-red-500 peer-focus:visible">
                저자를 입력해주세요
              </p>
            </div>
          </div>
        </div>
        <div className="pt-[40px]">
          <div className="h-[200px] w-[640px] gap-6">
            <div>
              <p className="text-[20px] font-semibold leading-8"> 출처 </p>
            </div>
            <div className="pt-[30px]">
              <label>
                <input
                  className="h-[64px] w-[640px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-[20px] placeholder:font-normal placeholder:text-blue-400"
                  placeholder="출처 제목 입력"
                  name=""
                  type="text"
                  value={referenceTitle}
                  onChange={handlereferenceTitleChange}
                ></input>
              </label>
            </div>
            <div className="pt-[20px]">
              <label>
                <input
                  className="h-[64px] w-[640px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-[20px] placeholder:font-normal placeholder:text-blue-500"
                  placeholder="URL (ex. https://www.website.com)"
                  name=""
                  type="text"
                  value={referenceUrl}
                  onChange={handleReferenceUrlChange}
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="pt-[60px]">
          <div className="h-[120px] w-[640px] gap-6">
            <div>
              <p className="h-32px] w-[35px] text-[20px] font-semibold leading-8">
                {' '}
                태그{' '}
              </p>
            </div>
            <div className="pt-[30px]">
              <label>
                <input
                  className="h-[64px] w-[640px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-blue-500"
                  placeholder="입력하여 태그 작성 (최대 10자)"
                  name=""
                  type="text"
                  value={tags}
                  onChange={handleTagChange}
                ></input>
              </label>
            </div>
          </div>
        </div>
        <div className="pt-[60px]">
          <button
            className="h-[64px] w-[640px] cursor-pointer rounded-lg border bg-slate-300 text-white hover:text-black-800"
            type="submit"
            name="complete"
          >
            작성 완료
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEpigramPageInput;
