'use client';

import { useRouter } from 'next/navigation';

export const useLoginCheck = () => {
  // use로 시작하는 hook 을 사용했기 때문에 이 함수는 커스텀 훅이 됨
  const router = useRouter();

  const loginCheck = () => {
    // 1. 로그인 체크
    // ...

    // 2. 실패시?
    alert('로그인을 아직 안 하셨군요!');
    router.push('/section08/08-04-custom-hook-login');
  };

  return {
    loginCheck,
  };
};
