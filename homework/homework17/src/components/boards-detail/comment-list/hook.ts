'use client';
import { fetchCommentByKey, fetchCommentList } from '@/api';
import { useEffect, useState } from 'react';
import {
  FetchCommentByKeyResponse,
  FetchCommentResponseSchema,
} from '@/schemas';

export const useCommentList = () => {
  const [commentListData, setCommentListData] =
    useState<FetchCommentByKeyResponse>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  // 초기 댓글 데이터 가져오기
  useEffect(() => {
    if (lastKey === null) {
      fetchCommentList();
    }
  }, [lastKey]);

  // 댓글 목록 가져오기
  const loadCommentList = async () => {
    try {
      const newData = await fetchCommentByKey(lastKey || '', limit);

      if (newData.length > 0) {
        setCommentListData(prev => [...prev, ...newData]);
        setLastKey(newData[newData.length - 1].id);
      }

      // 새 데이터의 갯수가 limit 보다 적은 경우 hasMore을 false로 변경
      if (newData.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    }
  };

  return { commentListData, formatDate, loadCommentList, hasMore };
};
