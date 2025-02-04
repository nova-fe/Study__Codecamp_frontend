'use client';
import { fetchAllKeys, fetchPostsByKey } from '@/api/boards';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState([]);
  const [keyList, setKeyList] = useState<string[]>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [myIndex, setMyIndex] = useState(-1);

  /**
   * data의 Key 목록 가져오기
   */
  useEffect(() => {
    const loadKeys = async () => {
      // 1. 게시글들의 모든 key를 요청
      const keys = await fetchAllKeys();
      // 2. 해당 값을 keyList 에 저장
      setKeyList(keys);
    };

    loadKeys();
  }, [])


  /**
   * 현재 페이지 데이터 가져오기
   */
  const limit = 10; // 한 페이지에 보여줄 게시글 갯수
  useEffect(() => {
    const loadData = async () => {
      // 1. key가 하나도 없다면(게시글이 없다면) return
      if (keyList.length === 0) return;

      // 2. keyList에서 현재 Page에서 -1을 한 값에  limit을 곱한 값을 startKey에 담음
      const startKey = keyList[(currentPage - 1) * limit];

      // 3. startKey(해당 값 이후의 데이터를 가져옴)와 limit(제한값)을 인자로 넣어서 게시글 목록 호출
      const posts = await fetchPostsByKey(startKey, limit);

      console.log(posts);
      // 4. 불러온 값을 data에 저장
      setData(posts);
    };

    loadData();
  }, [currentPage, keyList]); // 현재 페이지와 keyList가 변할 때마다 화면 리렌더링 

  // 수정하기
  const onClickEdit = (event) => {
    setMyIndex(Number(event.currentTarget.id));
  }

  return (
    <div>
      {data?.map((el, index) => (
        myIndex !== index ? (
        <div key={el.id}>
          <span style={{ margin: '10px' }}>{el?.writer}</span>
          <span style={{ margin: '10px' }}>{el?.title}</span>
          <button id={index} onClick={onClickEdit}>수정</button>
        </div>
        ) : (
          <input type='text' key={el.id} />
        )
      ))}
    </div>
  );
}
