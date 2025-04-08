import Image from 'next/image';
import { useBoardsList } from './hook';
import { IBoardsListProps } from './types';


export default function BoardsList({ data, onClickDelete, currentPage, limitPage, searchKeyword }: IBoardsListProps) {
  const { onClickLink } = useBoardsList();
  console.log(searchKeyword);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-6 py-4">
        <div className="w-16 text-center text-base font-medium">번호</div>
        <div className="text-base font-medium">제목</div>
        <div className="w-[6.5rem] text-center text-base font-medium">작성자</div>
        <div className="w-24 text-center text-base font-medium">날짜</div>
      </div>
      <div className="grid gap-3">
        {data.length <= 0 && <span className='text-center py-40 border-t border-b border-gray-100 '>게시글이 없습니다.</span>}

        {data && data?.map((board, index) => {
          const listIndex = (currentPage - 1) * limitPage + index + 1;

          return (
            <div
              className="group relative grid cursor-pointer grid-cols-[auto_1fr_auto_auto] gap-2 rounded-lg border border-gray-100 px-6 py-3"
              key={board?.id}
              onClick={() => onClickLink(board?.id)}
            >
              <div className="w-16 text-center text-sm font-light text-gray-400">
                {listIndex}
              </div>
              <div className="text-base font-medium">
                {
                /* .replaceAll() : 검색어의 앞과 뒤에 @#$ 라는 임의의 비밀코드로 감싼 것으로 교체함 
                  .split() : 그걸 @#$ 로 또 나눠서 배열로 만들고( ["@#$", "검색어", "@#$"] )
                  .map() : 그 배열을 순회하면서, 검색어 일 때에만 span 태그에 red로 스타일 지정
                */
                  board?.title.replaceAll(searchKeyword, `@#$${searchKeyword}@#$`).split("@#$").map((el, index) => {
                    return <span key={`${el}_${index}`} style={{color: el === searchKeyword ? "red" : ""}}>{el}</span>
                  })
                }
              </div>
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
          )
        })}
      </div>
    </>
  );
}
