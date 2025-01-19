'use client';
import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  interface IProps {
    [key: string]: {
      writer: string;
      title: string;
      contents: string;
    };
  }

  interface IPostArray {
    id: string;
    writer: string;
    title: string;
    contents: string;
  }

  // const post: Post = {
  //   id: "1",
  //   title: "제목",
  //   contents: "내용",
  //   writer: "작성자",
  //   date: "2025-01-01",
  // };

  // Post[]는 Post 객체 여러 개를 담을 수 있는 배열 타입
  // const posts: Post[] = [
  //   {
  //     id: "1",
  //     title: "제목1",
  //     contents: "내용1",
  //     writer: "작성자1",
  //     date: "2025-01-01",
  //   },
  //   {
  //     id: "2",
  //     title: "제목2",
  //     contents: "내용2",
  //     writer: "작성자2",
  //     date: "2025-01-02",
  //   },
  // ];

  const [data, setData] = useState<IPostArray[]>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json`,
        );
        const data: IProps = response.data;

        // 데이터를 배열로 변환(postArray: 배열)
        const postArray = data
          ? Object.keys(data).map(key => ({
              id: key, // 고유 ID
              ...data[key], // 데이터 내용
            }))
          : [];

        setData(postArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  const onClickLike = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault(); // 기본 이벤트(a 태그의 이동 등) 막기
    alert('Like ± 1!');
  };

  return (
    <div>
      {data?.map(el => (
        <a key={el.id} href="http://google.com">
          <div id={el.writer}>
            <span>
              <input type="checkbox" />
            </span>
            <span style={{ margin: '10px' }}>작성자: {el?.writer}</span>
            <span style={{ margin: '10px' }}>제목: {el?.title}</span>
            <span style={{ margin: '10px' }}>내용: {el?.contents}</span>
            <span onClick={onClickLike}>❤️</span>
          </div>
        </a>
      ))}
    </div>
  );
}
