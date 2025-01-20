'use client';

import { CreateCommentRequest, FetchCommentResponse } from '@/schemas';
import axios from 'axios';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

// 댓글 등록
export const createComment = async (commentData: CreateCommentRequest) => {
  const response = await axios.post(
    `${BASE_URL}/homework-comment.json`,
    commentData,
  );
  return response.data; // {name: ""}
};

// 댓글 목록 가져오기
export const fetchCommentList = async (): Promise<FetchCommentResponse> => {
  const response = await axios.get(`${BASE_URL}/homework-comment.json`);
  return response.data; // {id : {...}, id: {...}}
};
