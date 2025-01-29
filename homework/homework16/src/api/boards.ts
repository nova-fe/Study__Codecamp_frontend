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
  FetchBoardsKeysResponse,
  FetchBoardsKeysResponseSchema,
  FetchBoardsResponse,
  FetchBoardsResponseSchema,
  UpdateBoardRequest,
  UpdateBoardRequestSchema,
} from '../schemas/boards';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

// 게시판 목록 가져오기
export const fetchBoards = async (): Promise<FetchBoardsResponse> => {
  const response = await axios.get(`${BASE_URL}/homework.json`);
  const data = response.data;
  // 응답 데이터 검증
  FetchBoardsResponseSchema.parse(data);

  return data;
};

// 게시글 key 목록 가져오기
export const fetchBoardsKeys = async (): Promise<FetchBoardsKeysResponse> => {
  const response = await axios.get(`${BASE_URL}/homework.json`);
  const data = response.data;
  // 응답 데이터 검증
  FetchBoardsKeysResponseSchema.parse(data);

  return data ? Object.keys(data) : [];
};

// 게시글 등록
export const createBoard = async (newData: CreateBoardRequest): Promise<CreateBoardResponse> => {
  // 요청 데이터 검증
  CreateBoardRequestSchema.parse(newData);
  const response = await axios.post(`${BASE_URL}/homework.json`, newData);
  // 응답 데이터 검증
  CreateBoardResponseSchema.parse(response);

  return response.data;
};

// 특정 게시글 가져오기
export const fetchBoard = async (boardId: string): Promise<FetchBoardResponse> => {
  // 요청 데이터 검증
  FetchBoardRequestSchema.parse(boardId);
  const response = await axios.get(`${BASE_URL}/homework/${boardId}.json`);
  // 응답 데이터 검증
  FetchBoardResponseSchema.parse(response);

  return response.data;
};

// 게시글 수정(업데이트)
export const updateBoard = async (boardId: string, updatedData: UpdateBoardRequest) => {
  // 요청 데이터 검증
  UpdateBoardRequestSchema.parse({ boardId, updatedData });
  await axios.patch(`${BASE_URL}/homework/${boardId}.json`, updatedData);
};

// 게시글 삭제
export const deleteBoard = async (boardId: string) => {
  // 요청 데이터 검증
  DeleteBoardRequestSchema.parse({ boardId });
  await axios.delete(`${BASE_URL}/homework/${boardId}.json`);
};
