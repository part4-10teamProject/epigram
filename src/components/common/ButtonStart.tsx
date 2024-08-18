'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ButtonStartProps {
  text: string;
  className?: string;
}

const ButtonStart: React.FC<ButtonStartProps> = ({ text, className = '' }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedValue === 'true'); // isLoggedIn 값이 "true"일 때 로그인 상태로 간주
  }, []);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push('/epigrams');
    } else {
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`h-[48px] w-[112px] rounded-xl bg-black-500 text-xl font-semibold text-blue-100 xl:h-[64px] xl:w-full xl:text-2xl ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonStart;
