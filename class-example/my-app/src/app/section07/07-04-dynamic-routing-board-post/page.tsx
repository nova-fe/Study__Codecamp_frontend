'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AxiosPage() {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const data = {
    userId,
    title,
    body: content,
  };

  const onClickSubmit = async () => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        data,
      );

      const newPost = response.data;
      // 게시글 작성이 성공하면 상세 페이지로 이동
      // router.push(
      //   `/section07/07-04-dynamic-routing-board-post-moved/${newPost.id}`,
      // );

      alert('게시글 등록이 완료되었습니다.');
      router.push(`/section07/07-04-dynamic-routing-board-post-moved/33`); // Mock API 사용으로 인해 고정 id 임시 사용
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  // 한 줄일 때는 괄호() 필요 없음
  return (
    <>
      작성자: <input type="text" onChange={onChangeUserId} /> <br />
      제목: <input type="text" onChange={onChangeTitle} /> <br />
      내용: <input type="text" onChange={onChangeContent} /> <br />
      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </>
  );
}
