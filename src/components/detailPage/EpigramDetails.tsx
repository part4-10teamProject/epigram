'use client';
import { useEffect, useState } from 'react';
import Tags from '../common/Tags';
import toggle from '../../../public/assets/images/toggle.png';
import Image from 'next/image';
import Link from 'next/link';
import exclamation from '../../../public/assets/images/exclamation_mark.png';
import like from '../../../public/assets/icons/like.svg';
import move from '../../../public/assets/images/move.png';
import redlike from '../../../public/assets/icons/redlike.svg';
import { Epigrams } from '@/types/epigramList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { instance } from '@/api/client/AxiosInstance';
import { useRouter } from 'next/navigation';
import { deleteEpigram } from '@/api/client/deleteEpigram';
import { Modal } from '../common/Modal';

interface EpigramProps {
  epigram: Epigrams;
}

const EpigramDetails: React.FC<EpigramProps> = ({ epigram }) => {
  const [isMyPost, setIsMyPost] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [isLike, setIsLike] = useState(epigram.isLiked);
  const [likeCount, setLikeCount] = useState(epigram.likeCount);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteSuccesModal, setDeleteSuccesModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLikeToggle = async () => {
    const token = Cookies.get('token');

    try {
      if (isLike) {
        await instance.delete(`/epigrams/${epigram.id}/like`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsLike(false);
        setLikeCount(likeCount - 1);
      } else {
        await instance.post(
          `/epigrams/${epigram.id}/like`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIsLike(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const moveMainPage = () => {
    router.push('/epigrams');
  };

  const deleteEpigramMutation = useMutation({
    mutationFn: () => deleteEpigram(epigram.id),
    onSuccess: moveMainPage,
  });

  const handledelete = () => {
    deleteEpigramMutation.mutate();
  };

  useEffect(() => {
    const userId = Cookies.get('userId');
    if (Number(userId) === epigram.writerId) {
      setIsMyPost(true);
    }
    return () => {
      queryClient.removeQueries({ queryKey: ['detailData'] });
    };
  }, [queryClient, epigram.writerId]);

  return (
    <div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <Tags responseData={epigram} containerClassName={'flex gap-[16px]'} />
          {isMyPost && (
            <div className="relative h-[24px] w-[24px] cursor-pointer xl:h-[36px] xl:w-[36px]">
              <Image
                onClick={() => setIsDropDown(!isDropDown)}
                src={toggle}
                alt="토글"
              />
              {isDropDown && (
                <div className="absolute right-0 top-12 rounded-2xl border border-blue-300">
                  <div className="rounded- h-[40px] w-[97px] rounded-bl-[0px] rounded-br-[0px] rounded-tl-[16px] rounded-tr-[16px] bg-background px-6 py-2 text-lg hover:bg-blue-300 xl:h-[56px] xl:w-[134px] xl:px-8 xl:py-3 xl:text-2xl">
                    <Link href="/">수정하기</Link>
                  </div>
                  <div
                    onClick={() => setDeleteModal(true)}
                    className="h-[40px] w-[97px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[0px] rounded-tr-[0px] bg-background px-6 py-2 text-lg hover:bg-blue-300 xl:h-[56px] xl:w-[134px] xl:px-8 xl:py-3 xl:text-2xl"
                  >
                    삭제하기
                  </div>
                </div>
              )}
              <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                icon={<Image src={exclamation} alt="모달이미지" />}
                message="게시물을 삭제하시겠어요?"
                content="게시물은 삭제 후 복구할 수 없어요."
                buttons={[
                  {
                    text: '취소',
                    onClick: () => setDeleteModal(false),
                    type: 'secondary',
                  },
                  {
                    text: '삭제하기',
                    onClick: () => {
                      setDeleteModal(false);
                      setDeleteSuccesModal(true);
                    },
                    type: 'primary',
                  },
                ]}
              />
              <Modal
                isOpen={deleteSuccesModal}
                onClose={handledelete}
                message="게시물이 삭제되었습니다"
                buttons={[
                  {
                    text: '확인',
                    onClick: handledelete,
                  },
                ]}
              />
            </div>
          )}
        </div>
        <div className="font-custom text-[24px] leading-[40px] xl:text-[32px] xl:leading-[48px]">
          {epigram.content}
        </div>
        <div className="text-right font-custom text-[16px] leading-[26px] text-[#ABB8CE] md:text-[20px] md:leading-[28px] xl:text-[24px] xl:leading-[20px]">
          - {epigram.author} -
        </div>
      </div>
      <div className="absolute left-1/2 top-[300px] flex -translate-x-1/2 transform items-center gap-4 md:top-[365px] xl:top-[400px]">
        <button
          onClick={handleLikeToggle}
          className="flex items-center gap-1 rounded-full bg-black-600 px-[14px] py-[6px] text-white"
        >
          {isLike ? (
            <Image
              src={redlike}
              alt="좋아요"
              className="h-5 w-5 xl:h-9 xl:w-9"
            />
          ) : (
            <Image src={like} alt="좋아요" className="h-5 w-5 xl:h-9 xl:w-9" />
          )}

          {likeCount}
        </button>
        <Link href={`${epigram.referenceUrl}`}>
          <div className="flex items-center gap-[5px] rounded-full bg-[#F2F2F2] px-[14px] py-[6px] text-lg text-[#ABABAB] xl:text-2xl">
            {epigram.referenceTitle}
            <Image
              className="h-5 w-5 xl:h-9 xl:w-9"
              src={move}
              alt="이동하기"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EpigramDetails;
