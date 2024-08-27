'use client';
import Image from 'next/image';
import close from '../../../public/assets/images/close.png';
import profile from '../../../public/assets/images/profile_sample.png';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postImgUpload } from '@/api/client/postImgUpload';
import { patchUserProfileUpdate } from '@/api/client/patchUserProfileUpdate';
import { Modal } from '../common/Modal';
import exclamation from '../../../public/assets/images/exclamation_mark.png';

export interface MyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: {
    id: number;
    image: string;
    nickname: string;
    teamId: string;
    updatedAt: string;
  };
}

export const MyProfileModal: React.FC<MyProfileModalProps> = ({
  isOpen,
  onClose,
  userInfo,
}) => {
  const profileSrc = userInfo.image || profile;
  const imgSrc = typeof profileSrc === 'string' ? profileSrc : profileSrc.src; // StaticImageData타입 때문에 이런식으로 한번 더 타입을 검사함
  const [userImg, setUserImg] = useState(imgSrc);
  const [nickname, setNickName] = useState(userInfo.nickname);
  const [file, setFile] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editSuccessModal, setEditSuccessModal] = useState(false);
  const queryClient = useQueryClient();

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
  };

  const UserProfileMutation = useMutation({
    mutationFn: async () => {
      if (file) {
        const uploadImg = await postImgUpload(file);
        return patchUserProfileUpdate(uploadImg.url, nickname);
      } else {
        return patchUserProfileUpdate(userImg, nickname);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      onClose();
    },
  });

  const handleProfile = () => {
    UserProfileMutation.mutate();
    setEditSuccessModal(false);
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
            onClick={() => setEditModal(true)}
            className="rounded-full bg-black-500 px-4 py-3 text-white"
          >
            수정완료
          </button>
          <Modal
            isOpen={editModal}
            onClose={() => setEditModal(false)}
            icon={<Image src={exclamation} alt="수정이미지" />}
            message="프로필을 수정하시겠어요?"
            buttons={[
              {
                text: '취소',
                onClick: () => setEditModal(false),
                type: 'secondary',
              },
              {
                text: '수정하기',
                onClick: () => {
                  setEditModal(false);
                  setEditSuccessModal(true);
                }, // 여기를 클릭하면 삭제 API요청함수실행
                type: 'primary',
              },
            ]}
          />
          <Modal
            isOpen={editSuccessModal}
            onClose={() => setEditSuccessModal(false)}
            message="프로필이 수정되었습니다"
            buttons={[
              {
                text: '확인',
                onClick: handleProfile,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
