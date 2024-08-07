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
    // Check login status from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(!!isLoggedIn);
  }, []);

  const handleClick = () => {
    if (isLoggedIn === null) return; // Handle loading state if needed

    if (isLoggedIn) {
      router.push('/main'); // Redirect to main page if logged in
    } else {
      router.push('/login'); // Redirect to login page if not logged in
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
