'use client';

import Image from 'next/image';
import { useCommentList } from './hook';

export default function CommentList() {
  const { commentListData, formatDate } = useCommentList();

  return (
    <div>
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
              <div>⭐⭐⭐⭐⭐</div>
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
    </div>
  );
}
