'use client';
import { fetchAllKeys, fetchPostsByKey } from '@/api/boards';
import List from '@/components/14-05-pagination-next-refactoring/list';
import Pagination from '@/components/14-05-pagination-next-refactoring/pagination';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState([]); // 게시글 데이터
  const [keyList, setKeyList] = useState<string[]>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const limit = 2; // 한 페이지에 보여줄 게시글 갯수

  /**
   * 현재 페이지 데이터 limit 갯수만큼 가져오기
   */
  useEffect(() => {
    const loadData = async () => {
      // 1. key가 하나도 없다면(게시글이 없다면) return
      if (keyList.length === 0) return;

      // 2. keyList에서 현재 Page에서 -1을 한 값에  limit을 곱한 값을 startKey에 담음
      // 예시) 전체키목록[(현재페이지-1) * 제한갯수] -> 현재페이지가 3페이지인 경우, 2 * 10, 전체키목록[index가 20번째]인 값을 담음
      const startKey = keyList[(currentPage - 1) * limit];

      // 3. startKey(해당 값 이후의 데이터를 가져옴)와 limit(제한값)을 인자로 넣어서 게시글 목록 호출
      const posts = await fetchPostsByKey(startKey, limit);

      // 4. 불러온 값을 data에 저장
      setData(posts);
    };

    loadData();
  }, [currentPage, keyList]); // 현재 페이지와 keyList가 변할 때마다 화면 리렌더링

  /**
   * 데이터의 Key 목록 가져오기
   */
  useEffect(() => {
    const loadKeys = async () => {
      // 1. 게시글들의 모든 key를 요청
      const keys = await fetchAllKeys();
      // 2. 해당 값을 keyList 에 저장
      setKeyList(keys);
    };

    loadKeys();
  }, []);

  console.log(keyList);


  return (
    <div>
      <List data={data} />
      <Pagination keyList={keyList} setCurrentPage={setCurrentPage} limit={limit} />
    </div>
  );
}
