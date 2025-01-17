import axios from 'axios';
import { ICreateBoardRequst, IUpdateBoardRequst } from './types';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

// 게시판 목록 가져오기
export const fetchBoards = async () => {
  const response = await axios.get(`${BASE_URL}/homework.json`);
  return response.data;
};

// 특정 게시글 가져오기
export const fetchBoard = async (boardId: string) => {
  const response = await axios.get(`${BASE_URL}/homework/${boardId}.json`);
  return response.data;
};

// 게시글 작성
export const createBoard = async (newData: ICreateBoardRequst) => {
  const response = await axios.post(`${BASE_URL}/homework.json`, newData);
  return response.data;
};

// 게시글 수정(업데이트)
export const updateBoard = async (
  boardId: string,
  updatedData: IUpdateBoardRequst,
) => {
  await axios.patch(`${BASE_URL}/homework/${boardId}.json`, updatedData);
};

// 게시글 삭제
export const deleteBoard = async (boardId: string) => {
  await axios.delete(`${BASE_URL}/homework/${boardId}.json`);
};
