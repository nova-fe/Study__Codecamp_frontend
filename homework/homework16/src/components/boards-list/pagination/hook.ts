'use client';

import { useEffect, useState } from 'react';
import { IPaginationProps } from './type';

export const usePagination = ({ keyList, setCurrentPage, limitPage }: IPaginationProps) => {
  const [currentPageGroup, setCurrentPageGroup] = useState(0);
  const pagesLimitGroup = 5; // 한 그룹에 보여질  페이지 버튼 수

  // 총 페이지 수 계산
  const totalPages = Math.ceil(keyList.length / limitPage);
  const totalGroups = Math.ceil(totalPages / pagesLimitGroup);

  // 현재 그룹의 페이지 시작과 끝 계산
  const startPage = currentPageGroup * pagesLimitGroup + 1;
  const endPage = Math.min(startPage + pagesLimitGroup - 1, totalPages);

  // 숫자 이동
  const onClickPageChante = (page: number) => {
    setCurrentPage(page);
  }

  // 이전 페이지 이동
  const onClickPrevPage = () => {
    if (currentPageGroup > 0) setCurrentPageGroup(prev => prev - 1);
  }

  useEffect(() => {
    setCurrentPage(startPage);
  }, [currentPageGroup])

  // 다음 페이지 이동
  const onClickNextPage = () => {
    if (currentPageGroup < totalGroups - 1) {
      setCurrentPageGroup(prev => prev + 1)
    };
  }

  return {
    startPage,
    endPage,
    currentPageGroup,
    totalGroups,
    onClickPageChante,
    onClickPrevPage,
    onClickNextPage
  };
}