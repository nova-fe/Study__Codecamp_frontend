'use client';
import { fetchAllKeys, fetchPostsByKey } from '@/api/boards';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState([]); // 게시글 데이터
  const [keyList, setKeyList] = useState<string[]>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // 현재 페이지 그룹
  const limit = 1; // 한 페이지에 보여줄 게시글 갯수
  const pagesLimitGroup = 10;  // 한 그룹에 보여줄 페이지 버튼 수

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
   * 페이지 변경 함수
   * // 페이지 버튼을 클릭했을 때, index+1을 페이지로 넘김 (예시: 3페이지 버튼 클릭시 3을 넘김)
   */

  // 총 페이지 수 계산
  // (Math.ceil: 소수점이면 올림 처리)
  const totalPages = Math.ceil(keyList.length / limit); // 
  const totalGroups = Math.ceil(totalPages / pagesLimitGroup);

  /**
   * 현재 그룹의 페이지 시작과 끝 계산
   */
  // 예시) 11~20페이지까지 보여주고싶음
  // 1. 첫페이지 = 현재페이지그룹 * 페이지제한 + 1 => 11
  // (Math.min : 전달된 숫자들 중 가장 작은 값 반환)
  // 2. 마지막 페이지 = 가장작은값반환(첫페이지 + 페이지제한 - 1, 총페이지);
  // 3. 마지막 페이지: 20, 15 중 작은 값인 15 반환
  // => 첫페이지 11, 마지막 페이지 15
  const startPage = currentPageGroup * pagesLimitGroup + 1;
  const endPage = Math.min(startPage + pagesLimitGroup - 1, totalPages);

  // 숫자 이동
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 설정
  }
  // 이전 페이지 이동
  const handlePrevPage = () => {
    // 현재 페이지 그룹이 0 보다 클때만
    // 현재 페이지 그룹을 기존값 -1로 설정
    if (currentPageGroup > 0) setCurrentPageGroup((prev) => prev - 1);
  }
  // 다음 페이지 이동
  const handleNextPage = () => {
    // 현재페이지 그룹이 최대 페이지 그룹- 1 보다 작을 때만
    // 현재 페이지 그룹을 기존값 + 1로 설정
    if (currentPageGroup < totalGroups - 1) setCurrentPageGroup((prev) => prev + 1);

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
        <span onClick={handlePrevPage}> {`< 이전`} </span>

        {/**
         * 1. Array.from으로 새로운 배열 생성
         *    => Array.from(배열의 길이를 설정하는 객체, map 함수)
         * 2. {length: 마지막 페이지 - 시작페이지 + 1} // 마지막페이지 15이고 시작페이지 1일 경우: 14번 반복
         *    => 즉, 게시글 전체 갯수를 최대 보여질 갯수만큼 나누고, 그 값이 소수점일 경우 반올림하여 해당 숫자만큼 반복함
         * 3. 해당 페이지의 index+1 을 페이지로 표시하고, handlePageChange 부분에도 index+1로 넘김
         */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + startPage)}
            style={{ margin: '0 5px', backgroundColor: '#ddd', }}
          >
            {index + startPage}
          </button>
        ))}
        <span onClick={handleNextPage}> {`다음 >`} </span>
      </div>
    </div>
  );
}
