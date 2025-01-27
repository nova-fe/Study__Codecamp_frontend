'use client';
import { fetchAllKeys, fetchPostsByKey } from '@/api/board';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState([]);
  const [keyList, setKeyList] = useState<string[]>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지

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
  const limit = 5; // 한 페이지에 보여줄 게시글 갯수
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

  /**
   * 페이지 변경 함수
   * // 페이지 버튼을 클릭했을 때, index+1을 페이지로 넘김 (예시: 3페이지 버튼 클릭시 3을 넘김)
   */

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 설정
  }

  return (
    <div>
      {data?.map(el => (
        <div key={el.id}>
          <span style={{ margin: '10px' }}>{el?.writer}</span>
          <span style={{ margin: '10px' }}>{el?.title}</span>
        </div>
      ))}

      {/* 페이지 네비게이션 */}
      <div>
        {/**
         * 1. Array.from으로 새로운 배열 생성
         *    => Array.from(배열의 길이를 설정하는 객체, map 함수)
         * 2. {length: 소수점반올림(key갯수 / 최대보여질갯수)}
         * 3. 그 갯수만큼 페이지를 만듦
         */}
        {Array.from({ length: Math.ceil(keyList.length / limit) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{ margin: '0 5px', backgroundColor: '#ddd', }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
