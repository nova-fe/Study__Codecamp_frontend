'use client';

import { useRouter } from 'next/navigation';

export default function StaticRoutingPage() {
  const router = useRouter();

  const onClickSubmit = () => {
    // 1. 게시글 등록하기
    // ...
    // 2. 등록 페이지로 이동하기
    router.push('/section07/07-01-static-routing-moved');
  };

  return <button onClick={onClickSubmit}>게시글 등록하기</button>;
}
