'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchBoard } from '@/api';
import { IBoardsDetailData } from './types';

export const useBoardsDetail = () => {
  // URL에서 동적 파라미터 가져오기
  const { boardId } = useParams() as { boardId: string };
  const [data, setData] = useState<IBoardsDetailData>();

  useEffect(() => {
    const loadBoard = async () => {
      try {
        // Firebase Realtime Database에서 해당 게시글 불러오기
        const data = await fetchBoard(boardId);

        setData(data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    // boardId 가 유효할 때만 loadBoard 호출
    if (boardId) loadBoard();
  }, [boardId]);

  return {
    data,
    boardId,
  };
};
