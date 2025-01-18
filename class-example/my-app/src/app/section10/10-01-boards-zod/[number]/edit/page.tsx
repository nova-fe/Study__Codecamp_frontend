// 수정 페이지
'use client';

import { Post } from '@/commons/schemas';
import BoardsWrite from '@/components/10-01-boards-write-hooks-zod';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BoardsDetailEditPage() {
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

  return <BoardsWrite isEdit={true} data={data} />;
}
