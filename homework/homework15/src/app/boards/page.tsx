'use client';

import Navigation from '@/commons/layout/navigation';
import BannerList from '@/components/boards-list/banner';
import BoardsList from '@/components/boards-list/list';

export default function BoardsListPage() {
  return (
    <>
      <Navigation />
      <BannerList />
      <BoardsList />
    </>
  );
}
