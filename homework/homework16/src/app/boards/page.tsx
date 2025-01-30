'use client';

import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';
import { useState, useEffect } from 'react';
import { fetchBoardsByKey, fetchBoardsKey, deleteBoard } from '@/api/boards';
import { FetchBoardsByKeyArray, FetchBoardsByKeyResponse, FetchBoardsKeyResponse } from '@/schemas';



export default function BoardsListPage() {
  const [data, setData] = useState<FetchBoardsByKeyArray>([]); // 게시글 데이터
  const [keyList, setKeyList] = useState<FetchBoardsKeyResponse>([]); // key 목록
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
  const limitPage = 2; // 한 페이지에 보여줄 게시글 갯수

  /**
   * 현재 페이지 데이터 limit 갯수만큼 가져오기
   */
  useEffect(() => {
    const loadData = async () => {
      if (keyList.length === 0) return;

      // keyList에서 현재 페이지에서 -1을 한 값에 limit을 곱한값을 startKey에 담음
      const startKey = keyList[(currentPage - 1) * limitPage];

      const data = await fetchBoardsByKey(startKey, limitPage);

      // 목록 객체 배열화
      const boardsArray = data ? Object.keys(data).map((key, index) => ({
        id: key,  // 고유 Key
        number: index + 1,  // 글 번호를 index로 사용
        ...data[key]
      })) : [];

      setData(boardsArray);
    }

    loadData();
  }, [currentPage, keyList])

  /**
   * key 목록 가져오기
   */
  useEffect(() => {
    const loadKeys = async () => {
      const keys = await fetchBoardsKey();
      setKeyList(keys);
    }

    loadKeys();
  }, []);

  /**
   * 게시글 삭제하기
   */
  const onClickDelete = async (boardId: string) => {
    try {
      // 해당 게시글 삭제하기
      await deleteBoard(boardId);

      // 삭제된 게시글을 제외하고 상태 업데이트
      setData(prevData => {
        // 삭제된 게시글을 제외한 게시글들을 담음
        const updateBoards = prevData?.filter(board => board.id !== boardId);

        // 게시글 번호 재생성하여 return
        return updateBoards?.map((board, index) => ({
          ...board,
          number: index + 1, // 새 번호 할당
        }));
      });

      return;
    } catch (error) {
      console.log('게시글 삭제 실패' + error);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <div className="rounded-2xl px-12 py-6 shadow-[0_0_20px_-0px_rgba(0,0,0,0.08)]">
          <BoardsList data={data} onClickDelete={onClickDelete} />
          <Pagination keyList={keyList} currentPage={currentPage} setCurrentPage={setCurrentPage} limitPage={limitPage} />
        </div>
      </div>
    </>
  );
}
