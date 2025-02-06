'use client';

import { useCommentList } from './hook';

import InfiniteScroll from 'react-infinite-scroll-component';
import CommentListItem from '../comment-list-item';

export default function CommentList() {
  const { commentListData, formatDate, loadCommentList, hasMore } =
    useCommentList();

  return (
    <div>
      <InfiniteScroll
        next={loadCommentList}
        hasMore={hasMore} // hasMore 가 true 일 때 next가 실행됨
        loader={<div>로딩중입니다...</div>}
        dataLength={commentListData.length}
      >
        {commentListData?.map(comment => (
          <CommentListItem
            comment={comment}
            formatDate={formatDate}
            key={comment.commentId}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
