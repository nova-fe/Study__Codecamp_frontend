'use client';

import CommentList from '@/components/boards-detail/comment-list';
import CommentWrite from '@/components/boards-detail/comment-write';
import BoardsDetail from '@/components/boards-detail/detail';

export default function BoardsDetailPage() {
  return (
    <div className="container mx-auto max-w-screen-xl py-10">
      <BoardsDetail />
      <CommentWrite />
      <CommentList />
    </div>
  );
}
