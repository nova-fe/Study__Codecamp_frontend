'use client';

import { useRouter } from 'next/navigation';

export const useBoardsList = () => {
  const router = useRouter();

  // 날짜를 연-월-일 로 변환
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const onClickLink = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  return {
    formatDate,
    onClickLink,
  };
};
