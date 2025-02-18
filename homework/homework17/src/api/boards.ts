'use client';

import axios from 'axios';
import {
  CreateBoardRequest,
  CreateBoardRequestSchema,
  CreateBoardResponse,
  CreateBoardResponseSchema,
  DeleteBoardRequestSchema,
  FetchBoardRequestSchema,
  FetchBoardResponse,
  FetchBoardResponseSchema,
  FetchBoardsByKeyRequestSchema,
  FetchBoardsByKeyResponse,
  FetchBoardsByKeyResponseSchema,
  FetchBoardsKeyResponse,
  FetchBoardsResponse,
  FetchBoardsResponseSchema,
  UpdateBoardRequestSchema,
} from '../schemas/boards';
import { IUpdateBoardRequst } from './types';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

/**
 * 🔁게시판 목록 가져오기
 * @returns data {...}
 */
export const fetchBoardsApi = async (): Promise<FetchBoardsResponse> => {
  const response = await axios.get(`${BASE_URL}/homework.json`);
  const data = response.data;
  // 응답 데이터 검증
  FetchBoardsResponseSchema.parse(data);

  return data;
};

/**
 * 🔁게시글 key 목록 가져오기
 * @returns
 */
export const fetchBoardsKeyApi = async (): Promise<FetchBoardsKeyResponse> => {
  const response = await axios.get(`${BASE_URL}/homework.json`);
  const data = response.data;

  return data ? Object.keys(data) : [];
};

/**
 * 🔁특정 key와 limit에 따라 제한된 데이터 가져오기(페이징)
 * @param startKey 
 * @param limit 
 * @returns 
 */
// ?orderBy="$key" (key를 기준으로 정렬),  startAt: 해당 값 이후의 데이터를 가져옴, limitToFirst: 한번에 가져올 데이터 갯수 제한,
export const fetchBoardsByKeyApi = async (
  startKey: string,
  limit: number,
): Promise<FetchBoardsByKeyResponse> => {
  // 요청 데이터 검증
  FetchBoardsByKeyRequestSchema.parse({ startKey, limit });

  const url = `${BASE_URL}/homework.json?orderBy="$key"&startAt="${startKey}"&limitToFirst=${limit}`;
  const response = await axios.get(url);
  const data = response.data;

  // 응답 데이터 검증
  FetchBoardsByKeyResponseSchema.parse(data);

  return data;
};

/**
 * 🔁게시글 등록
 * @param newData 
 * @returns 
 */
export const createBoardApi = async (newData: CreateBoardRequest): Promise<CreateBoardResponse> => {
  // 요청 데이터 검증
  CreateBoardRequestSchema.parse(newData);
  const response = await axios.post(`${BASE_URL}/homework.json`, newData);
  const data = response.data;
  // 응답 데이터 검증
  CreateBoardResponseSchema.parse(data);

  return data;
};

/**
 * 🔁특정 게시글 가져오기
 * @param boardId 
 * @returns {...}
 */
export const fetchBoardApi = async (boardId: string | string[]): Promise<FetchBoardResponse> => {
  // 요청 데이터 검증
  FetchBoardRequestSchema.parse(boardId);
  const response = await axios.get(`${BASE_URL}/homework/${boardId}.json`);

  const data = response.data;
  // 응답 데이터 검증
  FetchBoardResponseSchema.parse(data);

  return data;
};

/**
 * 🔁게시글 수정(업데이트)
 * @param boardId 
 * @param updatedData 
 */
export const updateBoardApi = async (boardId: string, updatedData: IUpdateBoardRequst) => {
  // 요청 데이터 검증
  UpdateBoardRequestSchema.parse({boardId, updatedData});
  await axios.patch(`${BASE_URL}/homework/${boardId}.json`, updatedData);
};
 
/**
 * 🔁게시글 삭제
 * @param boardId 
 */
export const deleteBoardApi = async (boardId: string) => {
  // 요청 데이터 검증
  DeleteBoardRequestSchema.parse({ boardId });
  await axios.delete(`${BASE_URL}/homework/${boardId}.json`);
};
