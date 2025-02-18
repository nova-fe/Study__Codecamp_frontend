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
  // 특정 댓글 업데이트 상태 관리
  const [isUpdated, setIsUpdated] = useState(false);
  
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

  // 댓글 수정 후 리렌더링 => 해당 부분은 추후 확인하여 수정해보기
  // useEffect(() => {
  //   if(isUpdated) {
  //     setIsUpdated(false);
  //     setIsEdit(false);
  //     console.log("수정성공");
  //   }
  // }, [isUpdated]); // isUpdated가 변경 될 때마다 실행

  return {isEdit, setIsEdit, isUpdated, setIsUpdated, prevCommentData, commentId}
};
