// 상세 페이지
'use client';

import { Post } from '@/commons/schemas';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BoardsDetailPage() {
  const [data, setData] = useState<Post>();
  const { number } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example/${number}.json`,
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // number가 유효할 때만 fetchPost 호출
    if (number) fetchPost();
  }, [number]);

  return (
    <div>
      <div>상세페이지 이동이 완료되었습니다.</div>
      <div>작성자: {data?.writer}</div>
      <div>제목: {data?.title}</div>
      <div>내용: {data?.contents}</div>
      <Link href={`/section10/10-01-boards-zod/${number}/edit`}>
        수정하러 가기
      </Link>
    </div>
  );
}
