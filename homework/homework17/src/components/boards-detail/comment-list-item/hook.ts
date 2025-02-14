// 특정 댓글의 수정 모드(isEdit)
// 특정 댓글의 기존 내용(prevData)

import { FetchCommentResponse } from '@/schemas';
import { useEffect, useState } from 'react';
import { useComments } from '../hooks/useComments';
import { ICommentListItemProps } from './types';

export const useCommentListItem = ( { commentData }: ICommentListItemProps ) => {
  const {fetchCommentById } = useComments();

  // 특정 댓글 수정 상태 관리
  const [isEdit, setIsEdit] = useState(false);
  // 특정 댓글의 기존 내용
  const [prevCommentData, setPrevCommentData] = useState<FetchCommentResponse>();
  // 특정 댓글 ID
  const commentId: string = commentData?.commentId;

  // ✅ 기존 댓글 내용 가져오기
  useEffect(() => {
    const loadPrevComment = async () => {
      const prevData = await fetchCommentById(commentId);   // ✅ 개별 댓글 조회
      setPrevCommentData(prevData);
    };
    
    if(commentId) { loadPrevComment(); };
  }, [commentId]);

  return {isEdit, setIsEdit, prevCommentData, commentId}
};
