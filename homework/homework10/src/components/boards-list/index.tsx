import Image from 'next/image';
import { useBoardsList } from './hook';

export default function BoardsList() {
  const { formatDate, onClickDelete, onClickLink, boards } = useBoardsList();

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <div className="rounded-2xl px-12 py-6 shadow-[0_0_20px_-0px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-6 py-4">
            <div className="w-16 text-center text-base font-medium">번호</div>
            <div className="text-base font-medium">제목</div>
            <div className="w-[6.5rem] text-center text-base font-medium">
              작성자
            </div>
            <div className="w-24 text-center text-base font-medium">날짜</div>
          </div>
          <div className="grid gap-3">
            {boards?.map(board => (
              <div
                className="group relative grid grid-cols-[auto_1fr_auto_auto] gap-2 rounded-lg border border-gray-100 px-6 py-3"
                key={board?.id}
              >
                <div className="w-16 text-center text-sm font-light text-gray-400">
                  {board?.number}
                </div>
                <div
                  className="text-base font-medium cursor-pointer"
                  onClick={() => onClickLink(board?.id)}
                >
                  {board?.title}
                </div>
                <div className="w-[6.5rem] text-center text-base font-light">
                  {board?.writer}
                </div>
                <div className="w-24 text-center text-base font-light text-gray-400">
                  {board?.date}
                </div>
                <button
                  onClick={() => onClickDelete(board?.id)}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 transform group-hover:block"
                >
                  <Image
                    className="h-auto w-[15px]"
                    src="/images/delete.png"
                    alt="삭제"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
