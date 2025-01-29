'use client';

import BoardsList from '@/components/boards-list/list';
import Pagination from '@/components/boards-list/pagination';

export default function BoardsListPage() {
  return (
    <>
      <BoardsList />
      <Pagination />
    </>
  );
}
