'use client';

import {
  CreateCommentRequest,
  FetchCommentByKeyRequestSchema,
  FetchCommentByKeyResponseSchema,
  FetchCommentRequestSchema,
  FetchCommentResponse,
  FetchCommentResponseSchema,
  UpdateCommentRequestSchema,
} from '@/schemas';
import axios from 'axios';
import { IUpdateCommentRequest } from './types';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';


/**
 * 🔁댓글 등록
 * @param commentData : 입력 data {...}
 * @returns
 */
export const createCommentApi = async (commentData: CreateCommentRequest) => {
  const response = await axios.post(
    `${BASE_URL}/homework-comment.json`,
    commentData,
  );
  const data = response.data;
  return data;
};

/**
 * 🔁댓글 목록 가져오기
 * @returns data {id : {...}}
 */
export const fetchCommentListApi = async (): Promise<FetchCommentResponse> => {
  const response = await axios.get(`${BASE_URL}/homework-comment.json`);
  const data = response.data;
  return data;
};

/** 
 * 🔁특정 댓글 가져오기
 * @param commentId
 * @returns data {...}
 */
export const fetchCommentApi = async (commentId: string) => {
  // 요청 데이터 검증
  FetchCommentRequestSchema.parse(commentId);
  const response = await axios.get(`${BASE_URL}/homework-comment/${commentId}.json`);

  const data = response.data;
  // 응답 데이터 검증
  FetchCommentResponseSchema.parse(data);

  return data;
};


/**
 * 🔁특정 key와 limit에 따라 제한된 데이터 가져오기
 * @param startKey 
 * @param limit 
 * @returns [{commentId, ...}]
 */
export const fetchCommentByKeyApi = async (startKey: string, limit: number) => {
  // 요청 데이터 검증
  FetchCommentByKeyRequestSchema.parse({ startKey, limit });

  // ?orderBy="$key" (key를 기준으로 정렬),  startAfter: 해당 값 이후의 데이터를 가져옴, limitToFirst: 한번에 가져올 데이터 갯수 제한,\
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
        commentId: key,
        ...data[key],
      })),
    );
  }

  return [];
};

/**
 *  🔁댓글 수정(업데이트)
 * @param commentId 
 * @param updateData 
 */
export const updateCommentApi = async (
  commentId: string,
  updateData: IUpdateCommentRequest,
) => {
  UpdateCommentRequestSchema.parse({ commentId, updateData });

  let url = `${BASE_URL}/homework-comment/${commentId}.json`;
  await axios.patch(url, updateData);
};
