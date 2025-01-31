'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchBoard } from '@/api';
import {
  FetchBoardRequestSchema,
  FetchBoardResponse,
  FetchBoardResponseSchema,
} from '@/schemas';

export const useBoardsDetail = () => {
  // URL에서 동적 파라미터 가져오기
  let { boardId } = useParams();
  const [data, setData] = useState<FetchBoardResponse>();

  useEffect(() => {
    const loadBoard = async () => {
      try {
        // 요청 데이터 검증
        const requestId = FetchBoardRequestSchema.parse({ boardId });
        // 해당 게시글 불러오기
        const data = await fetchBoard(requestId.boardId);
        // 응답 데이터 검증
        const responseData = FetchBoardResponseSchema.parse(data);

        setData(responseData);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    loadBoard();
  }, [boardId]);

  return {
    data,
    boardId,
  };
};
