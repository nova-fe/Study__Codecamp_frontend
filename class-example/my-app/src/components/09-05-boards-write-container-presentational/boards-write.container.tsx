'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import BoardsWriteUI from './boards-write.presenter';

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

  // 게시글 등록
  const onClickSubmit = async () => {
    try {
      // Firebase에 게시글 추가(post)
      const response = await axios.post(
        'https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json',
        data,
      );
      alert('게시글 등록이 완료되었습니다.');

      const number = response.data.name;
      // 상세페이지로 이동
      router.push(`/section09/09-05-boards-container-presentational/${number}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 게시글 업데이트
  const onClickUpdate = number => {
    try {
      // 수정한 값이 있어야 수정이 되어야 함
      const updatedData = {
        ...props.data,
        // 새 값이 없으면 기존 값 유지
        writer: writer || props.data?.writer,
        title: title || props.data?.title,
        contents: contents || props.data?.contents,
      };

      // Firebase에 게시글 업데이트(patch)
      axios.patch(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example/${number}.json`,
        updatedData,
      );

      alert('게시글 수정이 완료되었습니다.');
      // 상세페이지로 이동
      router.push(`/section09/09-05-boards-container-presentational/${number}`);
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

  return (
    <BoardsWriteUI
      onChangeWriter={onChangeWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      onClickUpdate={onClickUpdate}
      isEdit={props.isEdit}
      number={number}
      data={props.data}
    />
  );
}
