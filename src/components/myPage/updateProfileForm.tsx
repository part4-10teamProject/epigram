'use client';

import updateUserProfile from '@/api/client/updateUserProfile';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UpdateProfileForm = () => {
  const { userInfo } = useAuth(); // 유저 정보 가져오기
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState('');

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      alert('프로필이 성공적으로 업데이트되었습니다!');
    },
    onError: (error) => {
      alert(`업데이트 실패: ${error.message}`);
    },
  });

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname || '');
      setImage(userInfo.image || '');
    }
  }, [userInfo]);

  const handleUpdate = () => {
    const updatedProfile = {
      image, // 사용자가 입력한 이미지 URL
      nickname, // 사용자가 입력한 닉네임
    };
    mutation.mutate(updatedProfile);
  };

  const isLoading = mutation.status === 'pending';
  const isError = mutation.status === 'error';
  const isSuccess = mutation.status === 'success';

  return (
    <div>
      <h1>프로필 업데이트</h1>
      <div>
        <label>닉네임:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <label>이미지 URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button onClick={handleUpdate} disabled={isLoading}>
        {isLoading ? '업데이트 중...' : '프로필 업데이트'}
      </button>
      {isError && <p>업데이트 중 오류가 발생했습니다.</p>}
      {isSuccess && <p>프로필이 성공적으로 업데이트되었습니다.</p>}
    </div>
  );
};

export default UpdateProfileForm;
