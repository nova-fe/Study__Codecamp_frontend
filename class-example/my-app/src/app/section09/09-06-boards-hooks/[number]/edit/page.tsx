// 수정 페이지
'use client';

import BoardsWrite from '@/components/09-06-boards-write-hooks';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BoardsDetailEditPage() {
  const [data, setData] = useState(null);
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
