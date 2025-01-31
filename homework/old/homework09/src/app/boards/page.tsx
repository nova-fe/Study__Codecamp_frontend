'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BoardsList() {
  interface Boards {
    id: string;
    number: number;
    writer: string;
    title: string;
    date: string;
    createdAt: string;
    password: string;
  }

  const [boards, setBoards] = useState<Boards[]>([]);
  const router = useRouter();

  // 날짜를 연-월-일 로 변환
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        // 목록 전체 불러옴
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework.json`,
        );
        const data = response.data;

        const boardArray = data
          ? Object.keys(data).map((key, index) => ({
              id: key, // 고유 ID
              number: index + 1, // 글 번호를 index로 사용
              ...data[key], // 데이터 내용
            }))
          : [];

        setBoards(boardArray);
        // 데이터를 배열로 변환
      } catch (error) {
        console.error('목록 조회 실패:', error);
      }
    };

    fetchBoards();
  }, []);

  const onClickLink = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  const onClickDelete = async (boardId: string) => {
    try {
      await axios.delete(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
      );
      alert('삭제되었습니다.');

      // 삭제된 게시글을 제외하고 상태 업데이트
      setBoards(prevBoards => {
        // 삭제된 게시글을 제외한 게시글들을 담음
        const updateBoards = prevBoards.filter(board => board.id !== boardId);

        // 게시글 번호 재생성하여 return
        return updateBoards.map((board, index) => ({
          ...board,
          number: index + 1, // 새 번호 할당
        }));
      });

      return;
    } catch (error) {
      console.log('게시글 삭제 실패' + error);
    }
  };

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
                  className="text-base font-medium"
                  onClick={() => onClickLink(board?.id)}
                >
                  {board?.title}
                </div>
                <div className="w-[6.5rem] text-center text-base font-light">
                  {board?.writer}
                </div>
                <div className="w-24 text-center text-base font-light text-gray-400">
                  {formatDate(board?.createdAt)}
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
