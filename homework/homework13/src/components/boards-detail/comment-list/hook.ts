'use client';
import { fetchCommentList } from '@/api';
import { useEffect, useState } from 'react';
import { ICommentListData } from './types';
import { FetchCommentResponseSchema } from '@/schemas';

export const useCommentList = () => {
  const [commentListData, setCommentListData] = useState<ICommentListData[]>();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  // 댓글 목록 가져오기
  useEffect(() => {
    const loadCommentList = async () => {
      try {
        // 전체 목록 불러오기
        const response = await fetchCommentList();

        // 응답 데이터 검증
        const responseData = FetchCommentResponseSchema.parse(response);

        // 목록 객체 배열화
        const CommentListArr = responseData // 목록 데이터가 있을 경우
          ? Object.keys(responseData).map(key => ({
              id: key,
              ...responseData[key],
            }))
          : []; // 없을 경우 빈 배열 반환

        setCommentListData(CommentListArr);
      } catch (error) {
        console.error('댓글 목록 조회 실패:', error);
      }
    };

    loadCommentList();
  }, [commentListData]);

  return { commentListData, formatDate };
};
