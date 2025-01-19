'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  // interface IProps {
  //   name: {
  //     writer: string;
  //     title: string;
  //     contents: string;
  //   };
  // }

  const [data, setData] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json`,
        );
        const data = response.data;

        // 데이터를 배열로 변환
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

  const onClickLike = e => {
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
