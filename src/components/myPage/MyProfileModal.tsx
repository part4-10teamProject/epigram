'use client';
import Image from 'next/image';
import close from '../../../public/assets/images/close.png';
import profile from '../../../public/assets/images/profile_sample.png';
import { ProfileModalProps } from '@/types/profileModal';
import { useState } from 'react';
import { instance } from '@/api/client/AxiosInstance';
import Cookies from 'js-cookie';

export const MyProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  writer,
}) => {
  const profileSrc = writer.image === null ? profile : writer.image;
  const [userImg, setUserImg] = useState(profileSrc);
  const [nickname, setNickName] = useState(writer.nickname);
  const [file, setFile] = useState(null);

  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TestFile = e.target.files?.[0];
    if (TestFile) {
      // 파일을 URL로 변환하여 상태를 업데이트
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImg(reader.result as string);
      };
      reader.readAsDataURL(TestFile);
      setFile(TestFile);
    }
    // setFile(e.target.files?.[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;
    // console.log('testFilr', file);

    const formData = new FormData();
    formData.append('image', file);
    try {
      const token = Cookies.get('token');
      const response = await instance.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
      // console.log('Upload success:', response.data);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black-950/60"
      onClick={onClose}
    >
      <div
        className="flex w-[360px] flex-col gap-[10px] rounded-[24px] bg-background px-6 pb-6 pt-4 xl:px-10 xl:pb-8 xl:pt-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex cursor-pointer justify-end">
          <Image
            src={close}
            alt="닫기"
            width={20}
            height={20}
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <div>
            <label htmlFor="profileImageInput">
              <Image
                className="h-[48px] w-[48px] cursor-pointer rounded-full"
                src={userImg}
                alt="프로필 이미지"
                width={48}
                height={48}
                priority
              />
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <input onChange={onChangeNickName} value={nickname} />
          <button
            onClick={handleSubmit}
            className="rounded-full bg-black-500 px-4 py-3 text-white"
          >
            수정완료
          </button>
        </div>
      </div>
    </div>
  );
};
