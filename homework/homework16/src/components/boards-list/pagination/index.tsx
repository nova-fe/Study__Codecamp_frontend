"use client"
import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';
import { usePagination } from './hook';
import { IPaginationProps } from './type';

export default function Pagination({ keyList, currentPage, setCurrentPage, limitPage }: IPaginationProps) {
  const {
    startPage,
    endPage,
    currentPageGroup,
    totalGroups,
    onClickPageChante,
    onClickPrevPage,
    onClickNextPage
  } = usePagination({ keyList, setCurrentPage, limitPage });

  // 다음 페이지 이동

  return (
    <div className="flex justify-center gap-2 my-2 items-center">
      <KeyboardArrowLeftRounded className={`${startPage === 1 ? "text-gray-400" : "text-gray-800"} cursor-pointer`}  onClick={onClickPrevPage} />
      <div className='flex items-center gap-1'>
        {
          Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button key={index} onClick={() => onClickPageChante(index + startPage)} className={`${(index + startPage) === currentPage ? "text-gray-800 font-medium rounded-lg bg-gray-100" : "text-gray-500 font-normal"} size-8 text-base text-gray-500`}>
              {index + startPage}
            </button>
          ))
        }
      </div>
      <KeyboardArrowRightRounded className={`${currentPageGroup < totalGroups - 1 ? "text-gray-800" : "text-gray-400"} cursor-pointer`} onClick={onClickNextPage} />
    </div>
  )
}