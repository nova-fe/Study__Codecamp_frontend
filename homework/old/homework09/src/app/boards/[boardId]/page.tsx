'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function BoardsDetail() {
  interface IProps {
    contents: string;
    password: string;
    title: string;
    writer: string;
  }

  // URL에서 동적 파라미터 가져오기
  const { boardId } = useParams();
  const [data, setData] = useState<IProps | undefined>();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Firebase Realtime Database에서 해당 게시글 불러오기
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
        );

        setData(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    // boardId 가 유효할 때만 fetchBoard 호출
    if (boardId) fetchBoard();
  }, [boardId]);

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <main>
          <article>
            {/* 상단 */}
            <div className="border-b border-gray-300 pb-4">
              <h2 className="mb-6 text-3xl font-bold text-black">
                {data?.title}
              </h2>
              <div className="align-center flex justify-between">
                <div className="flex flex-row gap-1">
                  <Image
                    className="h-auto w-6"
                    src="/images/profile.png"
                    alt="profile"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />

                  <p className="text-sm text-gray-500">{data?.writer}</p>
                </div>
                <div className="text-sm text-gray-400">2024.11.11</div>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="pb-10 pt-4">
              <div className="mb-6 flex justify-end gap-2">
                <button>
                  <Image
                    className="h-auto w-6"
                    src="/images/link.png"
                    alt="link"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </button>
                <button>
                  <Image
                    className="h-auto w-6"
                    src="/images/map.png"
                    alt="map"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </button>
              </div>

              {/* 내용 */}
              <div className="mb-6 font-normal text-black">
                <Image
                  className="mb-6 w-[400px]"
                  src="/images/d2.png"
                  alt="img"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p>{data?.contents}</p>
              </div>

              {/* 유튜브 */}
              <div className="mt-6 flex justify-center bg-gray-100 py-6">
                <Image
                  className="w-[822px]"
                  src="/images/d1.png"
                  alt="img"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>

              {/* 좋아요 */}
              <div className="mt-6 flex justify-center gap-6">
                <button className="flex flex-col items-center text-[#5F5F5F]">
                  <Image
                    className="h-auto w-6"
                    src="/images/unlike.png"
                    alt="unlike"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <span>24</span>
                </button>
                <button className="flex flex-col items-center text-[#F66A6A]">
                  <Image
                    className="h-auto w-6"
                    src="/images/like.png"
                    alt="like"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <span>12</span>
                </button>
              </div>
            </div>
          </article>

          <div className="flex justify-center gap-6">
            <button className="btn-black btn-sm flex items-center gap-3">
              <Image
                className="h-auto w-[18px]"
                src="/images/menu.png"
                alt="목록으로"
                width={0}
                height={0}
                sizes="100vw"
              />
              <span>목록으로</span>
            </button>
            <button className="btn-black btn-sm flex items-center gap-3">
              <Image
                className="h-auto w-[15px]"
                src="/images/pencil.png"
                alt="수정하기"
                width={0}
                height={0}
                sizes="100vw"
              />
              <span>수정하기</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
