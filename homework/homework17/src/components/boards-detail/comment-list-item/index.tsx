'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Rating } from '@mui/material';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { ICommentListItemProps } from './types';
import CommentWrite from '../comment-write';
import { useCommentListItem } from './hook';

export default function CommentListItem({ commentData, formatDate }: ICommentListItemProps) {
  const { isEdit, setIsEdit, prevCommentData, commentId } = useCommentListItem( { commentData, formatDate } );

  return (
    <div>
      {!isEdit ? (
        <div className="border-b border-b-gray-300 py-10 last:border-b-0">
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
              {/* 작성자 */}
              <div className="mr-2 font-light text-gray-500">
                {commentData?.writer}
              </div>
              {/* 별점 */}
              <Rating
                name="customized-color"
                value={commentData?.rating}
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
              {/* 수정 버튼 */}
              <button
                className="flex h-5 w-5 items-center justify-center"
                onClick={() => setIsEdit(true)}
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
                onClick={() => console.log('삭제 click!')}
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

          {/* 댓글 내용 */}
          <div className="mb-2 text-gray-800">{commentData?.contents}</div>

          {/* 작성일 */}
          <div className="text-sm text-gray-400">
            {formatDate(commentData?.createdAt)}
          </div>
        </div>
      ) : (
        <CommentWrite
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          commentData={commentData}
          prevCommentData={prevCommentData}
          commentId={commentId}
          formatDate={formatDate}
        />
      )}
    </div>
  );
}
