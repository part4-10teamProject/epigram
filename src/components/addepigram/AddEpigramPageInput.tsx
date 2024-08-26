'use client';

import { Addepigram, AddEpigramPost } from '@/api/client/Addepigramapi';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import React from 'react';
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
  const [isAuthorTouched, setIsAuthorTouched] = useState(false); // 저자 작성 유무확인하는 변수
  const [content, setContent] = useState('');
  const [hashTags, setHashTags] = useState('');

  const handleHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!['Enter', 'NumpadEnter'].includes(e.code)) return;
    if (tags.length >= 3) return;
    // 백엔드에서 태그는 3개이상 추가하지 못하게 만듬

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
    if (!regExp.test(e.currentTarget.value)) {
      setHashTags('');
    }
  };

  const router = useRouter();

  const EpigramPostMutation = useMutation({
    mutationFn: (epigram: Addepigram) => AddEpigramPost(epigram),
    onSuccess: ({ id }: epigrams) => {
      router.push(`/epigrams/${id}`);
    },
    onError: (error) => console.error(error),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const epigram = {
      tags,
      referenceUrl:
        referenceUrl.trim() !== '' ? referenceUrl : 'https://www.naver.com', // https는 작성안하면 api에러뜸. 그래서 기본값 넣어줘야하는데 네이버로 넣어줌
      referenceTitle,
      author,
      content,
    };

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
    setIsAuthorTouched(false);
  };

  const removeTag = (tagId) => {
    setTags(tags.filter((tag) => tag !== tagId));
  };

  return (
    <div className="mx-auto min-h-screen w-[312px] pt-14 md:w-[384px] xl:w-[640px]">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="">
            <p className="w-[312px] text-[16px] font-semibold leading-8 antialiased md:h-[32px] md:w-[384px] md:text-[20px] xl:h-[32px] xl:w-[640px] xl:text-[24px]">
              에피그램 만들기
            </p>
            <div className="h-[26px] w-[38px] gap-6 pt-[30px] md:h-[28px] md:w-[41px] xl:h-[35px] xl:w-[53px] xl:gap-1">
              <p className="h-[26px] w-[38px] pb-2 text-[14px] font-semibold leading-6 xl:w-[600px] xl:text-[20px] xl:leading-8">
                내용{' '}
                <span className="h-[26px] w-[9px] text-red-500 xl:w-[500px] xl:text-[24px] xl:leading-8">
                  {' '}
                  ⚹{' '}
                </span>
              </p>
              <div className="pt-3">
                <label>
                  <textarea
                    name="내용"
                    typeof="text"
                    value={content}
                    id="내용"
                    onChange={handleContentChange}
                    placeholder="500자 이내로 입력해주세요"
                    className={`${content.length >= 500 ? 'border-red-500 outline-none' : ''}placeholder:text-blue-400 h-[132px] w-[312px] resize-none rounded-md border-2 border-blue-300 px-4 py-[10px] text-xl font-normal md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px] xl:text-2xl`}
                  />

                  <p
                    className={`${content.length >= 500 ? 'block' : 'hidden'} mt-2 w-[312px] text-right text-xl text-red-500 md:h-[132px] md:w-[384px] xl:h-[148px] xl:w-[640px]`}
                  >
                    500자 이내로 입력해주세요.
                  </p>
                </label>
              </div>
            </div>
            <div className="pt-[220px]">
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
                      name="라디오버튼"
                      onClick={() => setAuthor('')}
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
                      name="라디오버튼"
                      onClick={() => setAuthor('알 수 없음')}
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
                      name="라디오버튼"
                      onClick={() => setAuthor('본인')}
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
                    className={`h-[44px] w-[312px] ${!author && isAuthorTouched ? 'border-red-500 outline-none' : ''} rounded-xl border-2 border-blue-300 px-4 text-xl placeholder:text-blue-400 md:h-[44px] md:w-[384px] xl:h-[64px] xl:w-[640px] xl:text-2xl`}
                    placeholder="저자 이름 입력"
                    type="text"
                    value={author}
                    onBlur={() => setIsAuthorTouched(true)}
                    onChange={handleAuthorChange}
                  ></input>
                  {!author && isAuthorTouched && (
                    <p className="text-right text-xl font-normal leading-7 text-red-500">
                      저자를 입력해주세요
                    </p>
                  )}
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
                      className="h-[44px] w-[312px] rounded-xl border-2 border-blue-300 px-4 text-xl placeholder:text-blue-400 md:h-[44px] md:w-[384px] xl:h-[64px] xl:w-[640px] xl:text-2xl"
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
                      className="h-[44px] w-[312px] rounded-xl border-2 border-blue-300 px-4 text-xl placeholder:text-blue-400 md:h-[44px] md:w-[384px] xl:h-[64px] xl:w-[640px] xl:text-2xl"
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
                      className="text-xl- h-[44px] w-[312px] rounded-xl border-2 border-blue-300 pl-3 placeholder:text-blue-400 md:h-[44px] md:w-[384px] xl:h-[64px] xl:w-[640px] xl:text-2xl"
                      placeholder="입력하여 태그 작성 (최대 10자, 최대 3개까지)"
                      value={hashTags}
                      onChange={handleTagChange}
                      onKeyUp={handleHashTag}
                      onKeyDown={handleEnterKey}
                    ></input>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap gap-4">
                {tags.map((tag) => (
                  <div
                    className="rounded-3xl bg-background px-3 py-2 text-xl leading-8 md:text-2xl xl:px-[14px] xl:py-3 xl:text-[24px]"
                    key={tag}
                  >
                    {tag} <button onClick={() => removeTag(tag)}>x</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-[30px]">
              <button
                disabled={!content || !author}
                className={`h-[48px] w-[312px] ${content && author ? 'bg-slate-700' : ''} rounded-lg border bg-slate-300 text-white md:h-[48px] md:w-[384px] xl:h-[64px] xl:w-[640px]`}
                type="submit"
                name="complete"
              >
                작성 완료
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEpigramPageInput;
