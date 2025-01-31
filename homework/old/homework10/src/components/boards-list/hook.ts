'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IBoardsListData } from './types';
import { deleteBoard, fetchBoards } from '@/api';
import { DeleteBoardRequestSchema, FetchBoardsResponseSchema } from '@/schemas';

export const useBoardsList = () => {
  const [boards, setBoards] = useState<IBoardsListData[]>();
  const router = useRouter();

  // 날짜를 연-월-일 로 변환
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const loadBoards = async () => {
      try {
        // 목록 전체 불러옴
        const data = await fetchBoards();

        // 응답 데이터 검증
        const responseData = FetchBoardsResponseSchema.parse(data);

        // 목록 객체 배열화
        const boardArray = responseData
          ? Object.keys(responseData).map((key, index) => ({
              id: key, // 고유 ID
              number: index + 1, // 글 번호를 index로 사용
              ...responseData[key], // 데이터 내용
            }))
          : [];

        setBoards(boardArray);
      } catch (error) {
        console.error('목록 조회 실패:', error);
      }
    };

    loadBoards();
  }, []);

  const onClickLink = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  const onClickDelete = async (boardId: string) => {
    try {
      // 요청 데이터 검증
      const requestId = DeleteBoardRequestSchema.parse({ boardId });

      // 해당 게시글 삭제하기
      await deleteBoard(requestId.boardId);

      alert('삭제되었습니다.');

      // 삭제된 게시글을 제외하고 상태 업데이트
      setBoards(prevBoards => {
        // 삭제된 게시글을 제외한 게시글들을 담음
        const updateBoards = prevBoards?.filter(board => board.id !== boardId);

        // 게시글 번호 재생성하여 return
        return updateBoards?.map((board, index) => ({
          ...board,
          number: index + 1, // 새 번호 할당
        }));
      });

      return;
    } catch (error) {
      console.log('게시글 삭제 실패' + error);
    }
  };

  return {
    formatDate,
    onClickLink,
    onClickDelete,
    boards,
  };
};
