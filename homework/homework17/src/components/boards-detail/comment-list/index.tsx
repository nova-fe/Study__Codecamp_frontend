'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import CommentListItem from '../comment-list-item';
import { useComments } from '../hooks/useComments';

export default function CommentList() {
  const { loadCommentList, commentListData, hasMore, formatDate } = useComments();

  return (
    <div>
      <InfiniteScroll
        next={loadCommentList}
        hasMore={hasMore} // hasMore 가 true 일 때 next가 실행됨
        loader={<div>로딩중입니다...</div>}
        dataLength={commentListData.length}
      >
        {commentListData?.map(commentData => (
          <CommentListItem
            commentData={commentData}
            formatDate={formatDate}
            key={commentData.commentId}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
