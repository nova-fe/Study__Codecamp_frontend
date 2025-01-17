'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { IBoardsDetailData } from './types';

export const useBoardsDetail = () => {
  // URL에서 동적 파라미터 가져오기
  const { boardId } = useParams();
  const [data, setData] = useState<IBoardsDetailData>();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Firebase Realtime Database에서 해당 게시글 불러오기
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
        );

        setData(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    // boardId 가 유효할 때만 fetchBoard 호출
    if (boardId) fetchBoard();
  }, [boardId]);

  return {
    data,
    boardId,
  };
};
