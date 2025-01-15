'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AxiosPage() {
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const router = useRouter();

  const data = {
    writer,
    title,
    contents,
  };

  const onClickSubmit = async () => {
    try {
      // Firebase에 게시글 추가
      const response = await axios.post(
        'https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json',
        data,
      );

      alert('게시글 등록이 완료되었습니다.');

      const boardId = response.data.name; // Firebase가 반환하는 자동 생성된 ID
      router.push(
        `/section07/07-04-dynamic-routing-board-post-moved/${boardId}`,
      ); // Mock API 사용으로 인해 고정 id 임시 사용
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  // 한 줄일 때는 괄호() 필요 없음
  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} /> <br />
      제목: <input type="text" onChange={onChangeTitle} /> <br />
      내용: <input type="text" onChange={onChangeContents} /> <br />
      <button onClick={onClickSubmit}>게시글 등록하기</button>
    </>
  );
}
