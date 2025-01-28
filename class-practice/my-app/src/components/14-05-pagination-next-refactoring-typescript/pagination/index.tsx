'use client';

import { usePagination } from "./hook"
import { IPropsPagination } from "./types";

export default function Pagination({ keyList, setCurrentPage, limit }: IPropsPagination) {
  const { handlePrevPage,
    handleNextPage,
    startPage,
    endPage,
    handlePageChange
  } = usePagination({ keyList, setCurrentPage, limit })

  return (
    <div>
      <span onClick={handlePrevPage}> {`< 이전`} </span>

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
  )
};
