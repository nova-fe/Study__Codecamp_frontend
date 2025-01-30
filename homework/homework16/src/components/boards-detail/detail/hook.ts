'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchBoard } from '@/api';
import { FetchBoardResponse } from '@/schemas';

export const useBoardsDetail = () => {
  // URL에서 동적 파라미터 가져오기
  const { boardId } = useParams();
  const boardIdStr: string = boardId as string;
  const [data, setData] = useState<FetchBoardResponse>();

  // 유튜브 Url에서 ID값 얻기
  const getYoutubeIdFromUrl = (url: string | null | undefined) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regExp);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const loadBoard = async () => {
      try {
        // 해당 게시글 불러오기
        const data = await fetchBoard(boardIdStr);

        setData(data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    loadBoard();
  }, [boardId]);

  return {
    data,
    boardId,
    getYoutubeIdFromUrl,
  };
};
