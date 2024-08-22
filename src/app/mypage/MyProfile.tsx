'use client';

import React from 'react';

// ProfileProps 인터페이스 정의
interface ProfileProps {
  name: string;
  imageUrl: string;
  onLogout: () => void;
}

// Profile 컴포넌트 구현
const Profile: React.FC<ProfileProps> = ({ name, imageUrl, onLogout }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg">
        <img
          src={imageUrl}
          alt={`${name}'s profile`}
          className="h-full w-full object-cover"
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

export default Profile;
