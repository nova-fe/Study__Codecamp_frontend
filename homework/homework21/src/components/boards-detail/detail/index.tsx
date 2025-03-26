import Image from 'next/image';
import Link from 'next/link';
import { useBoardsDetail } from './hook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import Tooltip from '@mui/material/Tooltip';
import YouTube, { YouTubeProps } from 'react-youtube';

export default function BoardsDetail() {
  const { data, boardId, getYoutubeIdFromUrl } = useBoardsDetail();
  console.log(data?.images);

  return (
    <div>
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
            {/* 상단 우측 아이콘 */}
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
              {data?.address && (
                <Tooltip
                  title={
                    data?.address?.address + ' ' + data?.address?.addressDetail
                  }
                  className="cursor-pointer"
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      backgroundColor: 'white',
                      color: 'black',
                    },
                  }}
                >
                  <Image
                    className="h-auto w-6"
                    src="/images/map.png"
                    alt="map"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </Tooltip>
              )}
            </div>

            {/* 내용 */}
            <div className="mb-6 font-normal text-black">
              <div className='flex flex-col items-center'>
                {
                  data?.images && data?.images.map((image, index) => {
                    if (image !== "notImage") { // 이미지가 있을 경우만(notImage가 아닐 경우만) 이미지 표시
                      return (
                        <Image
                        key={index}
                        className="mb-6 w-[400px]"
                        src={image}
                        alt="img"
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                      )
                    }
                  })
                }
              </div>
              <p>{data?.contents}</p>
            </div>

            {/* 유튜브 */}
            {data?.youtubeUrl && (
              <div className="mt-6 flex justify-center bg-gray-100 py-6">
                <div className="w-full max-w-[1000px]">
                  <div className="relative w-full pt-[56.25%]">
                    <YouTube
                      videoId={getYoutubeIdFromUrl(data?.youtubeUrl)}
                      opts={{
                        width: '100%',
                        height: '100%',
                      }}
                      className="absolute left-0 top-0 h-full w-full"
                      w-full
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 좋아요 */}
            <div className="mt-6 flex justify-center gap-6">
              <button className="flex flex-col items-center text-[#5F5F5F]">
                <HeartBrokenOutlinedIcon sx={{ fontSize: 24 }} />
                <span>24</span>
              </button>
              <button className="flex flex-col items-center text-[#F66A6A]">
                <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                <span>12</span>
              </button>
            </div>
          </div>
        </article>

        <div className="flex justify-center gap-6">
          <Link href="/boards">
            <button className="btn-black-line btn-sm flex items-center gap-3">
              <Image
                className="h-auto w-[18px]"
                src="/images/menu.png"
                alt="목록으로"
                width={0}
                height={0}
                sizes="100vw"
              />
              목록으로
            </button>
          </Link>

          <Link href={`/boards/${boardId}/edit`}>
            <button className="btn-black-line btn-sm flex items-center gap-3">
              <Image
                className="h-auto w-[15px]"
                src="/images/pencil.png"
                alt="수정하기"
                width={0}
                height={0}
                sizes="100vw"
              />
              수정하기
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
