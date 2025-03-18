'use client';
import { fetchAllKeys, fetchPosts } from '@/api/boards';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  const [data, setData] = useState([]); // 게시글 데이터
  const [allPostsData, setAllPostsData] = useState({}); // 모든 게시글 데이터
  const [keyList, setKeyList] = useState([]); // key 목록
  const [search, setSearch] = useState(""); // 검색어
  const [filteredKeyList, setFilteredKeyList] = useState([]); // 검색(필터링)된 key 목록
  const [isFilteredEmpty, setIsFilteredEmpty] = useState(false);  // 검색된 것이 없는지 여부 확인
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const pageSize = 5; // 한 페이지에 보여줄 게시글 갯수

  /**
   * data의 Key 목록 가져오기
   */
  useEffect(() => {
    const loadKeys = async () => {
      // 1. 게시글들의 모든 key 가져오기
      const keys = await fetchAllKeys();
      // 모든 게시글 가져오기
      const posts = await fetchPosts();
      // 2. 해당 값들을 state 에 저장
      setKeyList(keys);
      setFilteredKeyList(keys); // 필터링된 키 목록(기본적으로 모든 key 표시)
      setAllPostsData(posts); // 모든 게시글 데이터
    };

    loadKeys();
  }, []);

  /**
   * 페이지 변경 함수
   * // 페이지 버튼을 클릭했을 때, index+1을 페이지로 넘김 (예시: 3페이지 버튼 클릭시 3을 넘김)
   */
  const handlePageChange = (page) => {
    setCurrentPage(page); // 현재 페이지 설정
  }

  // 검색어 입력
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  }

  // 검색
  const onClickSearch = () => {
    if(!search.trim()) {   // trim() 메서드 앞뒤 공백 제거 → 빈 문자열인지 확인하기 위해 사용
      setFilteredKeyList(keyList);  // 검색어가 없을 경우 전체 keyList를 사용
      return;
    }
    // 검색어가 포함된 게시글 필터링
    // - filter() : 조건이 true인 요소만 새 배열로 반환
    const filteredKeys = keyList.filter((key) => {
      /**
       * - toLowerCase : 대소문자 구분 없이 검색하기 위해 소문자로 변환
       * - includes() : 특정 문자열이 포함 되어있는지 확인
       */
      const title = allPostsData[key]?.title; // 모든 데이터에서 title을 가져옴
      const isMatch = title.toLowerCase().includes(search.toLowerCase()); // 해당 타이틀이 검색어를 포함하고 있는지 확인
      return isMatch; // true나 bool로 return -> true인 경우만 filteredKeys 배열에 담음
    });

    setFilteredKeyList(filteredKeys); // 필터링된 key 목록 업데이트
  }

  /**
   * 현재 페이지 데이터 가져오기
   */
  useEffect(() => {
    console.log(filteredKeyList)
    // key가 하나도 없다면(게시글이 없다면) return
    if (filteredKeyList.length === 0) {
      setIsFilteredEmpty(true);
      return;
    };

      // 현재 페이지의 시작 index 계산 (현재 페이지에서 -1을 한 뒤(인덱스이기 때문), 보여줄 게시글 갯수만큼 곱함)
    const startIdx = (currentPage - 1) * pageSize;

    // - slice() : 배열에서 특정 범위의 요소를 잘라내는 메서드
    // - 페이지 번호에 따라 filteredKeyList에서 필요한 만큼의 key를 가져옴
    // - 한 페이지마다 보여지길 원하는 갯수가 5개인 경우,
    // - 필터링된 key 목록에서, startIdx(처음은 0), 첫 index에 보여지길 원하는 게시글 수만큼 자름
    const paginatedKeys = filteredKeyList.slice(startIdx, startIdx + pageSize);

    // 필터링된 key 목록에서 해당 key에 해당하는 게시글 데이터 가져오기
    const posts = paginatedKeys.map(key => allPostsData[key]);

    setData(posts);
    setIsFilteredEmpty(false);
  }, [currentPage, filteredKeyList, allPostsData]); // 현재 페이지, keyList, 게시글 데이터가 변할 때마다 화면 리렌더링

  return (
    <div>
      검색어입력: <input className="border" type='text' value={search} onChange={onChangeSearch}/>
      <button onClick={onClickSearch}>검색하기</button>

      {
        isFilteredEmpty && (
          <p>비어있어요</p>
        )
      }

      {data?.map((el, index) => (
        <div key={index}>
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
        {Array.from({ length: Math.ceil(filteredKeyList.length / pageSize) }, (_, index) => (
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
