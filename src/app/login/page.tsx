import LoginForm from '@/components/formField/LoginForm';

function LoginPage() {
  return (
    <div className="flex w-full flex-col items-end justify-center gap-[11px]">
      <LoginForm />
      <div className="flex text-[14px] md:text-[16px] xl:text-[20px]">
        <p className="text-blue-400">회원이 아니신가요?</p>
        <a href="/signup" className="underline">
          가입하기
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
