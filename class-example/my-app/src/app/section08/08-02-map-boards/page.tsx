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

  console.log(data);

  return (
    <div>
      {data?.map(el => (
        <div key={el.id}>
          <span style={{ margin: '10px' }}>작성자: {el?.writer}</span>
          <span style={{ margin: '10px' }}>제목: {el?.title}</span>
          <span style={{ margin: '10px' }}>내용: {el?.contents}</span>
        </div>
      ))}
    </div>
  );
}
