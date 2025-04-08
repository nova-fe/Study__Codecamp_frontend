'use client';

import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';
import { useState, useEffect } from 'react';
import {
  fetchBoardsKeyApi,
  deleteBoardApi,
  fetchBoardsApi,
} from '@/api/boards';
import {
  FetchBoardsByKeyArray,
  FetchBoardsKeyResponse,
  FetchBoardsResponse,
} from '@/schemas';
import Search from '../../components/boards-list/search';
import Link from 'next/link';
import Image from 'next/image';

export default function BoardsListPage() {
  const [data, setData] = useState<FetchBoardsByKeyArray>([]); // 게시글 데이터
  const [keyList, setKeyList] = useState<FetchBoardsKeyResponse>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const limitPage = 10; // 한 페이지에 보여줄 게시글 갯수
  const [allPostsData, setAllPostsData] = useState<FetchBoardsResponse>({}); // 모든 게시글 데이터
  const [filteredKeyList, setFilteredKeyList] = useState<FetchBoardsKeyResponse>([]); // 검색(필터링) key 목록
  const [isFilteredEmpty, setIsFilteredEmpty] = useState(false);  // 검색된 것이 없는지 여부 확인
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [searchedWord, setSearchedWord] = useState('');

  /**
   * 목록 가져오기
   */
  useEffect(() => {
    const loadKeys = async () => {
      // 게시글의 모든 key 가져오기
      const keys = await fetchBoardsKeyApi();
      // 모든 게시글 가져오기
      const posts = await fetchBoardsApi();
      // 해당 값들을 state에 저장
      setKeyList(keys);
      setFilteredKeyList(keys);  // 필터링된 키 목록을 기본적으로 모든 key로 설정
      setAllPostsData(posts);
      console.log("게시글 목록을 가져와요.");
    };

    loadKeys();
  }, []);

  /**
   * 게시글 출력(현재 페이지 데이터 limit 갯수만큼 가져오기)
   */
  useEffect(() => {
    const loadData = async () => {
      if (filteredKeyList.length === 0) {
        setIsFilteredEmpty(true);
        setData([]);
        return;
      }

      // 현재 페이지의 시작 index 계산
      const startIdx = (currentPage - 1) * limitPage;
      // 필터링된 key 목록에서, startIdx, 첫 index에 보여지길 원하는 게시글 수만큼 자름
      const paginatedKeys = filteredKeyList.slice(startIdx, startIdx + limitPage);

      // 필터링된 key 목록에서 해당 key에 해당하는 게시글의 데이터 가져오기
      const posts = paginatedKeys.map((key) => {
        return {id: key, ...allPostsData[key]};
      });

      setData(posts);
      setIsFilteredEmpty(false);
      console.log("게시글이 다시 출력돼요.");
    };

    loadData();
  }, [currentPage, filteredKeyList]);

  /**
   * 게시글 삭제하기
   */
  const onClickDelete = async (boardId: string) => {
    try {
      // 해당 게시글 삭제하기
      await deleteBoardApi(boardId);

      // 삭제된 게시글을 제외하고 상태 업데이트
      setData(prevData => {
        // 삭제된 게시글을 제외한 게시글들을 담음
        const updateBoards = prevData?.filter(board => board.id !== boardId);

        // 게시글 번호 재생성하여 return
        return updateBoards?.map(board => ({
          ...board,
        }));
      });

      // keyList 업데이트
      setKeyList([...keyList]);
      console.log("삭제 버튼을 눌렀어요.");
      return;
    } catch (error) {
      console.log('게시글 삭제 실패' + error);
    }
  };


  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <div className="mb-6 flex justify-between">
          <Search 
            setFilteredKeyList={setFilteredKeyList}
            keyList={keyList} 
            allPostsData={allPostsData}
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <Link href="/new">
            <button className="btn-primary btn-md flex items-center gap-2">
              <Image
                className="h-auto w-[19px]"
                src="/images/new.png"
                alt="트립토크 등록"
                width={0}
                height={0}
                sizes="100vw"
              />
              트립토크 등록
            </button>
          </Link>
        </div>
        <div className="rounded-2xl px-12 py-6 shadow-[0_0_20px_-0px_rgba(0,0,0,0.08)]">
          <BoardsList
            data={data}
            onClickDelete={onClickDelete}
            currentPage={currentPage}
            limitPage={limitPage}
            searchKeyword={searchKeyword}
          />
          <Pagination
            filteredKeyList={filteredKeyList}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limitPage={limitPage}
          />
        </div>
      </div>
    </>
  );
}
