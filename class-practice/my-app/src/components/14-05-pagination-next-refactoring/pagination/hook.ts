'use client';
import { useState } from 'react';

export const usePagination = ({ keyList, setCurrentPage, limit }) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // 현재 페이지 그룹
  const pagesLimitGroup = 10; // 한 그룹에 보여줄 페이지 버튼 수

  // 총 페이지 수 계산
  // (Math.ceil: 소수점이면 올림 처리)
  const totalPages = Math.ceil(keyList.length / limit); //
  const totalGroups = Math.ceil(totalPages / pagesLimitGroup);

  /**
   * 현재 그룹의 페이지 시작과 끝 계산
   */
  const startPage = currentPageGroup * pagesLimitGroup + 1;
  const endPage = Math.min(startPage + pagesLimitGroup - 1, totalPages);

  // 숫자 이동
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 설정
  };
  // 이전 페이지 이동
  const handlePrevPage = () => {
    // 현재 페이지 그룹이 0 보다 클때만
    // 현재 페이지 그룹을 기존값 -1로 설정
    if (currentPageGroup > 0) setCurrentPageGroup(prev => prev - 1);
  };
  // 다음 페이지 이동
  const handleNextPage = () => {
    // 현재페이지 그룹이 최대 페이지 그룹- 1 보다 작을 때만
    // 현재 페이지 그룹을 기존값 + 1로 설정
    if (currentPageGroup < totalGroups - 1)
      setCurrentPageGroup(prev => prev + 1);
  };

  return {
    handlePrevPage,
    handleNextPage,
    startPage,
    endPage,
    handlePageChange,
  };
};
