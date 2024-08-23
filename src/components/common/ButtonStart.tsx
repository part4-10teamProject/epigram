'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface ButtonStartProps {
  text: string;
  className?: string;
}

const ButtonStart: React.FC<ButtonStartProps> = ({ text, className = '' }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

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
