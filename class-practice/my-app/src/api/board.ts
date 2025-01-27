'use client';

import axios from 'axios';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

/**
 * 모든 게시글 데이터 가져오기
 * @returns 게시글 데이터(response.data)
 */
export const fetchPosts = async () => {
  const url = `${BASE_URL}/class-practice.json`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * 모든 데이터의 key 목록 가져오기 (페이징에서 사용)
 * @return data의 key 배열
 */
export const fetchAllKeys = async () => {
  const url = `${BASE_URL}/class-practice.json`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    // data의 key를 배열로 반환
    return data ? Object.keys(data) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * 특정 시작 key와 limit에 따라 데이터 가져오기(페이징용 갯수 제한 데이터)
 */
// ?orderBy="$key" (key를 기준으로 정렬),  startAt: 해당 값 이후의 데이터를 가져옴, limitToFirst: 한번에 가져올 데이터 갯수 제한,
export const fetchPostsByKey = async (startKey: string, limit: number) => {
  const url = `${BASE_URL}/class-practice.json?orderBy="$key"&startAt="${startKey}"&limitToFirst=${limit}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data) {
      return Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
    }

    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
