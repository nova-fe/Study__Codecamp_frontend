'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

export default function BoardsWrite(props) {
  const router = useRouter();
  const { number } = useParams();

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const data = {
    writer,
    title,
    contents,
  };

  const updatedData = {
    ...data,
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

      const boardId = response.data.name;
      // 상세페이지로 이동
      router.push(`/section09/09-03-boards/${boardId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUpdate = (number, updatedData) => {
    try {
      // Firebase에 게시글 추가
      axios.patch(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example/${number}.json`,
        updatedData,
      );

      alert('게시글 수정이 완료되었습니다.');
      // 상세페이지로 이동
      router.push(`/section09/09-03-boards/${number}`);
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
      <button
        onClick={
          props.isEdit
            ? () => onClickUpdate(number, updatedData)
            : onClickSubmit
        }
      >
        {props.isEdit ? '수정' : '등록'}
      </button>
    </>
  );
}
