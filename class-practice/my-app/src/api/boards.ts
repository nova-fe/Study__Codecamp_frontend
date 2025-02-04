'use client';

import {
  FetchAllKeysResponse,
  FetchBoardsResponse,
  FetchPostsByKeyRequestSchema,
  FetchPostsByKeyResponseSchema,
} from '@/schemas';
import axios from 'axios';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

/**
 * 모든 게시글 데이터 가져오기
 * @returns 게시글 데이터
 */
export const fetchPosts = async (): Promise<FetchBoardsResponse> => {
  const url = `${BASE_URL}/class-practice.json`;
  const response = await axios.get(url);
  const data = response.data;
  return data;
};

/**
 * 모든 데이터의 key 목록 가져오기 (페이징에서 사용)
 * @return data의 key 배열
 */
export const fetchAllKeys = async (): Promise<FetchAllKeysResponse> => {
  const url = `${BASE_URL}/class-practice.json`;
  const response = await axios.get(url);
  const data = response.data;

  // data의 key를 배열로 반환
  return data ? Object.keys(data) : [];
};

/**
 * 특정 시작 key와 limit에 따라 데이터 가져오기(페이징용 갯수 제한 데이터)
 */
// ?orderBy="$key" (key를 기준으로 정렬),  startAt: 해당 값 이후의 데이터를 가져옴, limitToFirst: 한번에 가져올 데이터 갯수 제한,
export const fetchPostsByKey = async (startKey: string, limit: number) => {
  // 요청 데이터 검증
  FetchPostsByKeyRequestSchema.parse({ startKey, limit });

  let url = `${BASE_URL}/class-practice.json?orderBy="$key"&limitToFirst=${limit}`;

  if(startKey) {
    url += `&startAfter="${startKey}"`
  }

  const response = await axios.get(url);
  const data = response.data;

  if (data) {
    // 응답 데이터 검증
    return FetchPostsByKeyResponseSchema.parse(
      Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      })),
    );
  }

  return [];
};
