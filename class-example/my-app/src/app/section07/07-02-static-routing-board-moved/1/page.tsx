'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://main-example.codebootcamp.co.kr/board/70')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      })
      .then(function () {
        console.log('데이터 받아오기 완료');
      });
  }, []);

  return (
    <div>
      <div>1 상세페이지 이동이 완료되었습니다.</div>

      {/**
       * 1. data && data.fetchBoard => 앞이 참일 경우 뒤의 값을 보여줌
       * 앞의 값이 거짓일 때 뒤의 값을 보여주는 것 : Nullish coalescing
       * 2. data ?? data.fetchBoard => 앞의 값이 빈 값이면 뒤의 값을 보여줌
       * 3. data || data.fetchBoard => 앞의 값이 거짓(false)일 경우 뒤의 값을 보여줍
       */}
      <div>작성자: {data?.writer}</div>
      <div>제목: {data?.title}</div>
      <div>내용: {data?.contents}</div>
    </div>
  );
}
