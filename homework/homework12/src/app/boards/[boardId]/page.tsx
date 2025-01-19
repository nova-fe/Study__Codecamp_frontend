'use client';

import CommentWrite from '@/components/boards-detail/comment-write';
import BoardsDetail from '@/components/boards-detail/detail';

export default function BoardsDetailPage() {
  return (
    <>
      <BoardsDetail />
      <CommentWrite />
    </>
  );
}
