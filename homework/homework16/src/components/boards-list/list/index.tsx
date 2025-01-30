import Image from 'next/image';
import { useBoardsList } from './hook';
import { IBoardsListProps } from './types';


export default function BoardsList({ data, onClickDelete }: IBoardsListProps) {
  const { onClickLink } = useBoardsList();

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-6 py-4">
        <div className="w-16 text-center text-base font-medium">번호</div>
        <div className="text-base font-medium">제목</div>
        <div className="w-[6.5rem] text-center text-base font-medium">
          작성자
        </div>
        <div className="w-24 text-center text-base font-medium">날짜</div>
      </div>
      <div className="grid gap-3">
        {data?.map(board => (
          <div
            className="group relative grid cursor-pointer grid-cols-[auto_1fr_auto_auto] gap-2 rounded-lg border border-gray-100 px-6 py-3"
            key={board?.id}
            onClick={() => onClickLink(board?.id)}
          >
            <div className="w-16 text-center text-sm font-light text-gray-400">
              {board?.number}
            </div>
            <div className="text-base font-medium">{board?.title}</div>
            <div className="w-[6.5rem] text-center text-base font-light">
              {board?.writer}
            </div>
            <div className="w-24 text-center text-base font-light text-gray-400">
              {board?.date}
            </div>
            <button
              onClick={e => {
                e.stopPropagation();
                onClickDelete(board?.id);
              }}
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



    </>
  );
}
