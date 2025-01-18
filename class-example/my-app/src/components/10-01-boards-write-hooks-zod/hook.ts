'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useRouter, useParams } from 'next/navigation';
import { IBoardsWriteProps } from './types';
import { PostSchema } from '@/commons/schemas';

export const useBoardsWrite = (props: IBoardsWriteProps) => {
  const router = useRouter();
  const { number } = useParams() as { number: string };

  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const data = {
    writer,
    title,
    contents,
  };

  // 데이터 검증
  const validatePostData = (data: any) => {
    try {
      // Zod 스키마로 검증
      PostSchema.parse(data);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('검증 에러: ' + error.message);
      }
      return false;
    }
  };

  // 게시글 등록 요청
  const onClickSubmit = async () => {
    // 데이터 검증
    if (!validatePostData(data)) {
      console.error('검증에 실패한 데이터: ' + data);
      return;
    }

    try {
      // Firebase에 게시글 추가(post)
      const response = await axios.post(
        'https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json',
        data,
      );
      alert('게시글 등록이 완료되었습니다.');

      const number = response.data.name;
      // 상세페이지로 이동
      router.push(`/section10/10-01-boards-zod/${number}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 게시글 업데이트
  const onClickUpdate = (number: string) => {
    // 수정한 값이 있어야 수정이 되어야 함
    const updatedData = {
      ...props.data,
      // 새 값이 없으면 기존 값 유지
      writer: writer || props.data?.writer,
      title: title || props.data?.title,
      contents: contents || props.data?.contents,
    };

    // 데이터 검증
    if (!validatePostData(updatedData)) {
      console.error('검증에 실패한 업데이트 데이터: ' + updatedData);
      return;
    }

    try {
      // Firebase에 게시글 업데이트(patch)
      axios.patch(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example/${number}.json`,
        updatedData,
      );

      alert('게시글 수정이 완료되었습니다.');
      // 상세페이지로 이동
      router.push(`/section10/10-01-boards-zod/${number}`);
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

  return {
    onChangeWriter,
    onChangeTitle,
    onChangeContents,
    onClickUpdate,
    onClickSubmit,
    number,
  };
};
