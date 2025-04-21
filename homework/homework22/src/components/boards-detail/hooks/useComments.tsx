// ✅ 댓글 관련 데이터 및 API 호출
// 전체 댓글 목록
// 댓글 추가/삭제/수정

import { fetchCommentByKeyApi, fetchCommentListApi, fetchCommentApi, createCommentApi, updateCommentApi } from "@/api";
import { IUpdateCommentRequest } from "@/api/types";
import {CreateCommentRequest, CreateCommentResponseSchema, FetchCommentByKeyResponse, FetchCommentResponse} from '@/schemas';
import { useEffect, useState } from "react";

export function useComments() {
  const [commentListData, setCommentListData] = useState<FetchCommentByKeyResponse>([]);  // 특정 key 댓글 데이터
  const [lastKey, setLastKey] = useState<string | null>(null);  // 마지막 key값 관리 (무한스크롤)
  const [hasMore, setHasMore] = useState(true); // 더 불러올지의 여부 (무한스크롤)
  const limit = 10; // 댓글 목록 제한 갯수 (무한스크롤)

  /**
   * ✅ 모든 댓글 '목록' 불러오기
   * => lastKey가 없을 때(가장 첫 목록)만 가져옴
   */
  useEffect(() => {
    if (lastKey === null) {
      fetchCommentListApi(); // 댓글 목록 가져오기 api
    }
  }, [lastKey]);

  
  /**
   * ✅ 댓글 목록 스크롤 불러오기
   * => 무한스크롤 이용을 위해 lastkey를 저장하고 그 key 이후의 댓글을 불러옴
   * => 스크롤을 할 때 hasMore 상태에 따라 loadCommentList 함수가 실행됨
   * => commentData 상태관리로 10개 불러온 뒤 추가하여 10개를 불러오는 로직 작성
   */
  const loadCommentList = async () => {
    try {
      const newData = await fetchCommentByKeyApi(lastKey || '', limit);

      if (newData.length > 0) {
        // 기존 데이터에 새로 불러온 데이터를 담아서 새로운 배열을 생성하여 담음
        // => 무한스크롤시 10개만 보였다가 새로운 데이터를 불러와서 20개가 보이게 등 하기위해
        setCommentListData(prev => [...prev, ...newData]);
        setLastKey(newData[newData.length - 1].commentId);
      }

      // 새 데이터의 갯수가 limit 보다 적은 경우 hasMore을 false로 변경
      if (newData.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    }
  };
  

  /**
   * ✅ 댓글 '내용' id 값으로 불러오기 (댓글 수정용)
   * @param commentId 
   * @returns 
   */
  const fetchCommentById = async (commentId: string) => {
    try {
      return await fetchCommentApi(commentId);
    } catch (error) {
      console.log('댓글 조회 실패', error);
      return;
    }
  }

  /**
   * ✅ 댓글 등록
   * @param commentData 
   */
  const addComment = async ( commentData: CreateCommentRequest )=> {
    const response = await createCommentApi(commentData);
    // 응답 데이터 검증
    const data = CreateCommentResponseSchema.parse(response);
    console.log("댓글 등록 성공: ", data);
  }

  /**
   * ✅ 댓글 수정(업데이트)
   * @param commentId 
   * @param updatedData 
   */
  const updateComment = async ( commentId: string, updatedData: IUpdateCommentRequest) => {
    await updateCommentApi(commentId, updatedData);
  }

  // ✅ 댓글 삭제

  // 댓글 날짜 텍스트 변환
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  };

  return { loadCommentList, addComment, updateComment, fetchCommentById, commentListData, hasMore, formatDate }
}