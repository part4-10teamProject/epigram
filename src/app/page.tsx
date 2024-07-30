'use client';
import { Modal } from '@/components/common/Modal';
import { useState } from 'react';

export default function Home() {
  const [isModal, setIsModal] = useState(true);
  const [istwoModal, setIsTwoModal] = useState(false);

  return (
    <div>
      랜딩페이지
      <Modal
        isOpen={isModal}
        onClose={() => setIsModal(false)}
        message="댓글을 삭제하시겠어요?"
        buttons={[
          { text: '취소', onClick: () => setIsModal(false) },
          {
            text: '삭제하기',
            onClick: () => {
              setIsModal(false);
              setIsTwoModal(true);
            },
          },
        ]}
      />
      <Modal
        isOpen={istwoModal}
        onClose={() => setIsModal(false)}
        message="댓글이 삭제되었습니다"
        buttons={[
          {
            text: '확인하기',
            onClick: () => setIsTwoModal(false),
          },
        ]}
      />
    </div>
  );
}
