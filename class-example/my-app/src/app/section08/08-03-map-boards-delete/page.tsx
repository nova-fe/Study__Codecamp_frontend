'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  interface PostDetail {
    id: string;
    writer: string;
    title: string;
    contents: string;
  }

  const [data, setData] = useState<PostDetail[]>([]);

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
        console.error('게시글 조회 실패' + error);
      }
    };

    fetchPost();
  }, []);

  const onClickDelete = async (postId: string) => {
    try {
      // 특정 게시글 삭제
      await axios.delete(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example/${postId}.json`,
      );

      alert('삭제되었습니다.');
      // 삭제된 게시글을 제외하고 상태 업데이트
      // // prevData 는 현재 상태값을 React 가 자동으로 전달
      setData(prevData => {
        // filter 콜백함수 return값 -> true인 요소는 결과 배열에 포함, false는 제외
        // post: prevData를 순회하면서 각 게시글 객체를 참조
        // post.id: 현재 post 객체의 id 값.
        return prevData.filter(post => post.id !== postId);
      });
    } catch (error) {
      console.log('게시글 삭제 실패' + error);
    }
  };

  return (
    <div>
      {data?.map(post => (
        <div key={post?.id}>
          <span>
            <input type="checkbox" />
          </span>
          <span style={{ margin: '10px' }}>작성자: {post?.writer}</span>
          <span style={{ margin: '10px' }}>제목: {post?.title}</span>
          <span style={{ margin: '10px' }}>내용: {post?.contents}</span>
          <span>
            <button onClick={() => onClickDelete(post?.id)}>삭제</button>
          </span>
        </div>
      ))}
    </div>
  );
}
