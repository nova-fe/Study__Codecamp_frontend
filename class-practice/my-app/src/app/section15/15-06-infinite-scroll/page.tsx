'use client';
import { fetchPostsByKey } from '@/api';
import { FetchPostsByKeyResponse } from '@/schemas';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function StaticRoutingMovedPage() {
  const limit = 3;

  const [data, setData] = useState<FetchPostsByKeyResponse>([]);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    if (lastKey === null) {  // 처음 실행될 때만 호출
      fetchBoards();
    }
  }, [lastKey]);

  // 게시글 데이터 불러오기
  const fetchBoards = async () => {
    try {
      const newData = await fetchPostsByKey(lastKey || "", limit);
      // console.log("📌 새로 불러온 데이터:", newData);

      if (newData.length > 0) {
        setData(prev => [...prev, ...newData]); // 기존 게시글에 새 데이터 추가
        setLastKey(newData[newData.length - 1].id); // 마지막 게시글의 id 저장
      }

      // 새 데이터가 없을 경우 hasMore 을 false로 변경
      if(newData.length < limit) {
        setHasMore(false);
      }

    } catch (error) {
      console.error("데이터 로드 실패", error);
    }
  }

  // console.log("📌 마지막 id:",lastKey);

  return (
    <div>
      <InfiniteScroll
        next={fetchBoards}
        hasMore={hasMore}  // hasMore 가 true 일 때 next가 실행됨
        loader={<div>로딩중입니다...</div>}
        dataLength={data.length}
      >
        {data?.map(el => (
          <div key={el.id}>
            <span style={{ margin: '10px' }}>{el?.writer}</span>
            <span style={{ margin: '10px' }}>{el?.title}</span>
          </div>
        ))}
      </InfiniteScroll>

    </div>
  );
}
