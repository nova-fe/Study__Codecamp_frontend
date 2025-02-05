'use client';

import {
  CreateCommentRequest,
  FetchCommentByKeyRequestSchema,
  FetchCommentByKeyResponseSchema,
  FetchCommentResponse,
  UpdateCommentRequestSchema,
} from '@/schemas';
import axios from 'axios';
import { IUpdateCommentRequest } from './types';

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

/**
 * 특정 key와 limit에 따라 제한된 데이터 가져오기
 */
// ?orderBy="$key" (key를 기준으로 정렬),  startAfter: 해당 값 이후의 데이터를 가져옴, limitToFirst: 한번에 가져올 데이터 갯수 제한,
export const fetchCommentByKey = async (startKey: string, limit: number) => {
  // 요청 데이터 검증
  FetchCommentByKeyRequestSchema.parse({ startKey, limit });

  let url = `${BASE_URL}/homework-comment.json?orderBy="$key"&limitToFirst=${limit}`;
  if (startKey) {
    url += `&startAfter="${startKey}"`;
  }

  const response = await axios.get(url);
  const data = response.data;

  if (data) {
    // 응답 데이터 검증
    return FetchCommentByKeyResponseSchema.parse(
      Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })),
    );
  }

  return [];
};

/**
 * 댓글 수정(업데이트)
 */
export const updateComment = async (
  id: string,
  updateData: IUpdateCommentRequest,
) => {
  UpdateCommentRequestSchema.parse({ id, updateData });

  let url = `${BASE_URL}/homework-comment/${id}.json`;
  const response = await axios.patch(url, updateData);
};
