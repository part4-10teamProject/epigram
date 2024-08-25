'use client';
import Image from 'next/image';
import close from '../../../public/assets/images/close.png';
import profile from '../../../public/assets/images/profile_sample.png';
import { ProfileModalProps } from '@/types/profileModal';

/**
 *
 * @isOpen - 모달의 표시여부를 나타냄
 * @onClose - 모달을 닫는 함수
 * @writer -  모달에 렌더링될 데이터들 (이미지주소, 닉네임)
 * 
 * 사용 예제 
 * <ProfileModal
      isOpen={isModal}
      onClose={() => setIsModal(false)}
      writer={writer}
    />
 */

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  writer,
}) => {
  if (!isOpen) return null;

  const profileSrc = writer.image === null ? profile : writer.image;
  // writer.lmage 값이 기본URL이면 profile 이미지를 적용하고 기본 URL이 아니면 writer.image 이미지를 적용한다

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
            <Image
              className="h-[48px] w-[48px] rounded-full"
              src={profileSrc}
              alt="프로필 이미지"
              width={48}
              height={48}
              priority
            />
          </div>
          <div>{writer.nickname}</div>
        </div>
      </div>
    </div>
  );
};
