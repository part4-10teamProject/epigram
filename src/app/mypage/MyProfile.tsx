'use client';

import React from 'react';

interface ProfileProps {
  name: string;
  imageUrl: string;
  onLogout: () => void;
  onImageChange: (newImageUrl: string) => void;
  onProfileUpdate: () => void;
}

const MyProfile: React.FC<ProfileProps> = ({
  name,
  imageUrl,
  onLogout,
  onImageChange,
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('새로운 이미지 로드 완료:', reader.result); // 이미지 로드 확인용 로그
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <label htmlFor="profileImageInput">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="h-full w-full cursor-pointer object-cover"
          />
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-black-950">{name}</h2>
      <button
        onClick={onLogout}
        className="mt-2 rounded-[100px] bg-line-100 px-4 py-2 text-gray-500 hover:bg-gray-300 focus:outline-none"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyProfile;
