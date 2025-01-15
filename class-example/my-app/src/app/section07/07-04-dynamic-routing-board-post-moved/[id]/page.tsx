'use client';
import axios from 'axios';
import { useParams } from 'next/navigation'; // import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  // 구버전 방식(useRouter)
  // const router = useRouter();
  // router.push("")
  // router.query.qqq

  // 신버전 방식(useParams)
  // URL에서 동적 파라미터 가져오기 (구조분해할당으로 id 가져옴)
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // id가 유효할 때만 fetchPost 호출
    if (id) fetchPost();
  }, [id]);

  return (
    <div>
      <div>상세페이지 이동이 완료되었습니다.</div>
      <div>작성자: {data?.userId}</div>
      <div>제목: {data?.title}</div>
      <div>내용: {data?.body}</div>
    </div>
  );
}
