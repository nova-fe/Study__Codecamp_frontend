'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState(null);

  // 구버전 방식(useRouter)
  // const router = useRouter();
  // router.push("")
  // router.query.qqq

  // 신버전 방식(useParams)
  // URL에서 동적 파라미터 가져오기 (구조분해할당으로 qqq만 가져옴)
  const { qqq } = useParams();

  useEffect(() => {
    axios
      .get(`http://main-example.codebootcamp.co.kr/board/${qqq}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      })
      .then(function () {
        console.log('데이터 받아오기 완료');
      });
  }, [qqq]);

  return (
    <div>
      <div>상세페이지 이동이 완료되었습니다.</div>
      <div>작성자: {data?.writer}</div>
      <div>제목: {data?.title}</div>
      <div>내용: {data?.contents}</div>
    </div>
  );
}
