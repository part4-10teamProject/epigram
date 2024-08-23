'use client';

import { AddEpigramPost } from '@/api/Addepigramapi';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import React from 'react';
import { Addepigram } from '@/api/Addepigramapi';
import { useRouter } from 'next/navigation';
import { isEmptyValue, sanitizeHashTag } from '@/utils/hashtag';

interface epigrams {
  id: number;
}

const AddEpigramPageInput: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [referenceTitle, setReferenceTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [hashTags, setHashTags] = useState('');

  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code)) return;

    const newHashTag = sanitizeHashTag(e.currentTarget.value);

    if (!isEmptyValue(newHashTag) && !tags.includes(newHashTag)) {
      setTags((prevHashTags) =>
        Array.from(new Set([...prevHashTags, newHashTag])),
      );
      setHashTags('');
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code)) return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(e.currentTarget.value)) setHashTags('');
  };

  const router = useRouter();

  const EpigramPostMutation = useMutation({
    mutationFn: (epigram: Addepigram) => AddEpigramPost(epigram),
    onSuccess: (epigram: epigrams) => {
      router.push(`/epigrams/${epigram.id}`);
    },
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
    setHashTags(e.target.value);
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
              <p className="h-[26px] w-[38px] pb-2 text-[14px] font-semibold leading-6 xl:w-[600px] xl:text-[20px] xl:leading-8">
                {' '}
                저자{' '}
                <span className="h-[26px] w-[9px] text-red-500 xl:w-[500px] xl:text-[24px] xl:leading-8">
                  {' '}
                  ⚹{' '}
                </span>
              </p>
            </div>
            <div className="h-[26px] w-[268px] gap-4 xl:h-[32px] xl:w-[333px] xl:gap-6 xl:pt-3">
              <label className="h-[26px] w-[88px] md:gap-1 xl:h-[32px] xl:w-[107px] xl:gap-2">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[20px] w-[20px] rounded-[10px] border-2 border-blue-300 align-middle xl:h-[24px] xl:w-[24px] xl:rounded-[40px]"
                  color="black"
                />{' '}
                <span className="h-[26px] w-[60px] pl-1 align-middle text-[16px] font-medium leading-6 xl:h-[32px] xl:w-[75px] xl:text-[20px] xl:leading-8">
                  직접 입력
                </span>
              </label>
              <label className="h-[26px] w-[92px] gap-2 pl-[10px] xl:h-[32px] xl:w-[111px] xl:gap-2">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[20px] w-[20px] rounded-[10px] border-2 border-blue-300 align-middle xl:h-[24px] xl:w-[24px] xl:rounded-[40px]"
                  color="black"
                />{' '}
                <span className="h-[26px] w-[64px] align-middle text-[16px] font-medium leading-6 xl:h-[32px] xl:w-[79px] xl:text-[20px] xl:leading-8">
                  알 수 없음
                </span>
              </label>
              <label className="h-[26px] w-[56px] gap-2 pl-[10px] xl:h-[32px] xl:w-[67px] xl:gap-2 xl:pl-3">
                <input
                  type="radio"
                  name="직접 입력"
                  className="h-[20px] w-[20px] rounded-[10px] border-2 border-blue-300 align-middle xl:h-[24px] xl:w-[24px] xl:rounded-[40px]"
                  color="black"
                />{' '}
                <span className="h-[26px] w-[28px] align-middle text-[16px] font-medium leading-6 xl:h-[32px] xl:w-[35px] xl:pl-1 xl:text-[20px] xl:leading-8">
                  본인
                </span>
              </label>
            </div>
            <div className="pt-8">
              <input
                className="focus: Border-1 peer h-[44px] w-[312px] rounded-xl border border-blue-300 pl-2 focus:border-red-500 active:border-red-500 md:h-[44px] md:w-[384px] xl:h-[64px] xl:w-[640px] xl:gap-2 xl:rounded-xl xl:border-2 xl:pl-3 xl:text-[20px]"
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
          <div className="h-[128px] w-[312px] gap-2 md:h-[130px] md:w-[384px] md:gap-2 xl:h-[200px] xl:w-[640px] xl:gap-6">
            <div>
              <p className="h-[24px] w-[25px] text-[14px] font-semibold leading-6 md:h-[26px] md:w-[28px] md:text-[16px] xl:h-[32px] xl:w-[35px] xl:text-[20px] xl:leading-8">
                {' '}
                출처{' '}
              </p>
            </div>
            <div className="pt-[30px]">
              <label>
                <input
                  className="h-[44px] w-[312px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-[16px] placeholder:font-normal placeholder:text-blue-400 md:h-[44px] md:w-[384px] md:gap-2 xl:h-[64px] xl:w-[640px] xl:gap-2 xl:placeholder:text-[20px]"
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
                  className="h-[44px] w-[312px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-[16px] placeholder:font-normal placeholder:text-blue-400 md:h-[44px] md:w-[384px] md:gap-2 xl:h-[64px] xl:w-[640px] xl:gap-2 xl:placeholder:text-[20px]"
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
          <div className="h-[76px] w-[312px] gap-2 md:h-[78px] md:w-[384px] md:gap-2 xl:h-[120px] xl:w-[640px] xl:gap-6">
            <div>
              <p className="h-[24px] w-[25px] text-[14px] font-semibold leading-6 md:h-[26px] md:w-[28px] md:text-[16px] xl:h-[32px] xl:w-[35px] xl:text-[20px] xl:leading-8">
                {' '}
                태그{' '}
              </p>
            </div>
            <div className="pt-[30px]">
              <label>
                <input
                  className="h-[44px] w-[312px] gap-2 rounded-xl border-2 border-blue-300 pl-3 placeholder:align-middle placeholder:text-[16px] placeholder:font-normal placeholder:text-blue-400 md:h-[44px] md:w-[384px] md:gap-2 xl:h-[64px] xl:w-[640px] xl:gap-2 xl:placeholder:text-[20px]"
                  placeholder="입력하여 태그 작성 (최대 10자)"
                  name=""
                  value={hashTags}
                  onChange={handleTagChange}
                  onKeyUp={handleHashTag}
                  onKeyDown={handleEnterKey}
                ></input>
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-wrap gap-2 pt-8 xl:h-[56px] xl:w-[614px]">
          {tags.map((tags) => (
            <div
              className="rounded-3xl bg-[#F5F7FA] xl:h-[56px] xl:w-[194px] xl:gap-2 xl:px-[14px] xl:py-3"
              key={tags}
            >
              <p className="grid place-items-center text-[#5E5E5E] xl:h-[32px] xl:w-[166px] xl:text-[24px] xl:font-normal xl:leading-8">
                {tags}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-[60px]">
          <button
            className="h-[48px] w-[312px] cursor-pointer rounded-lg border bg-slate-300 text-white hover:text-black-800 md:h-[48px] md:w-[384px] xl:h-[64px] xl:w-[640px]"
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
