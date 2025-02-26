"use client"

/**
 * 1. firebase 프로젝트 만들기
 * 2. 접속정보 복사해오기
 * 3. firestore 데이터베이스 생성하기
 */

import { firebaseApp } from '@/commons/libraries/17-01-firebase';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

export default function FirebasePage() {
  const onClickSubmit = async () => {
    const board = collection(getFirestore(firebaseApp), 'board');
    await addDoc(board, {
      writer: "철수",
      title: "안녕하세요",
      contents: "반갑습니다"
    });
  }
  const onClickFetch = async () => {
    const board = collection(getFirestore(firebaseApp), 'board');
    const result = await getDocs(board);
    const datas = result.docs.map((el) => el.data());
    console.log(datas);
  }

  return (
    <>
      <button onClick={onClickSubmit}>등록하기</button>
      <button onClick={onClickFetch}>조회하기</button>
    </>
  )
};
