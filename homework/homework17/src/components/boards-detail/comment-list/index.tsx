'use client';

import Image from 'next/image';
import { useCommentList } from './hook';
import { Rating } from '@mui/material';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CommentList() {
  const { commentListData, formatDate, loadCommentList, hasMore  } = useCommentList();

  return (
    <div>
      <InfiniteScroll
        next={loadCommentList}
        hasMore={hasMore}  // hasMore 가 true 일 때 next가 실행됨
        loader={<div>로딩중입니다...</div>}
        dataLength={commentListData.length}
      >
        {commentListData?.map(comment => (
            <div
              className="border-b border-b-gray-300 py-10 last:border-b-0"
              key={comment.id}
            >
              <div className="relative mb-2 pr-14">
                <div className="flex items-center">
                  <Image
                    className="mr-1 h-auto w-6"
                    src="/images/profile.png"
                    alt="profile"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <div className="mr-2 font-light text-gray-500">
                    {comment?.writer}
                  </div>
                  <Rating
                    name="customized-color"
                    value={comment?.rating}
                    precision={0.5} // 별점단위(소수점)
                    classes={{
                      iconFilled: 'text-yellow-300', // 채워진 아이콘에 색상 적용
                      iconEmpty: 'text-gray-200', // 빈 아이콘에 색상 적용
                    }}
                    // 아이콘 변경
                    icon={<StarRateRoundedIcon fontSize="inherit" />}
                    emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
                    readOnly={true}
                  />
                </div>

                <div className="absolute right-0 top-0 flex gap-2">
                  <button
                    className="flex h-5 w-5 items-center justify-center"
                    onClick={() => console.log('click!')}
                  >
                    <Image
                      className="h-[15px] w-[15px]"
                      src="/images/pencil.png"
                      alt="profile"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </button>
                  <button
                    className="flex h-5 w-5 items-center justify-center"
                    onClick={() => console.log('click!')}
                  >
                    <Image
                      className="h-[12px] w-[12px]"
                      src="/images/close.png"
                      alt="profile"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </button>
                </div>
              </div>

              <div className="mb-2 text-gray-800">{comment?.contents}</div>

              <div className="text-sm text-gray-400">
                {formatDate(comment?.createdAt)}
              </div>
            </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
