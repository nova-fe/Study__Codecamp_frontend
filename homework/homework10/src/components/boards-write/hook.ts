import { useEffect, ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { IBoardsWriteData } from './types';

export const useBoardsWrite = () => {
  const router = useRouter();
  const { boardId } = useParams() as { boardId: string };

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentsError, setContentsError] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const newData = {
    writer,
    password,
    title,
    contents,
    createdAt: new Date().toISOString(), // ISO 8601 형식으로 날짜 저장
  };

  const errMessage = '필수입력 사항 입니다.';

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (event.target.value && password && title && contents)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (writer && event.target.value && title && contents)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (writer && password && event.target.value && contents)
      return setIsActive(true);
    setIsActive(false);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);

    if (writer && password && title && event.target.value)
      return setIsActive(true);
    setIsActive(false);
  };

  // 게시글 등록
  const onClickPost = async () => {
    if (writer && password && title && contents) {
      setWriterError(false);
      setPasswordError(false);
      setTitleError(false);
      setContentsError(false);

      try {
        // Firebase에 게시글 추가
        const response = await axios.post(
          'https://nova-codecamp-board-default-rtdb.firebaseio.com/homework.json',
          newData,
        );

        alert('게시글 등록이 완료되었습니다.');
        // 게시글이 추가된 후, 해당 게시글의 ID로 이동
        const boardId = response.data.name; // Firebase가 반환하는 자동 생성된 ID
        router.push(`/boards/${boardId}`);
      } catch (error) {
        alert('에러가 발생하였습니다. 다시 시도해 주세요.');
        console.error('게시글 작성 실패:', error);
      }

      return;
    } else {
      if (writer === '') {
        setWriterError(true);
      } else {
        setWriterError(false);
      }
      if (password === '') {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (title === '') {
        setTitleError(true);
      } else {
        setTitleError(false);
      }
      if (contents === '') {
        setContentsError(true);
      } else {
        setContentsError(false);
      }
    }
  };

  // 게시글 업데이트
  const onClickUpdate = async () => {
    const password = prompt(
      '글을 입력할때 입력하셨던 비밀번호를 입력해주세요.',
    );
    if (password === prevData?.password) {
      try {
        const updatedData = {
          ...prevData,
          title: title || prevData?.title,
          contents: contents || prevData?.contents,
        };

        await axios.patch(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
          updatedData,
        );

        alert('게시글 수정이 완료되었습니다.');
        router.push(`/boards/${boardId}`);
      } catch (error) {
        alert('에러가 발생하였습니다. 다시 시도해 주세요.');
        console.error('게시글 수정 실패:', error);
      }
    } else {
      alert('비밀번호를 확인해주세요.');
    }
  };

  // 기존 게시글 내용 가져오기
  const [prevData, setPrevData] = useState<IBoardsWriteData>();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        // Firebase Realtime Database에서 해당 게시글 불러오기
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
        );

        setPrevData(response.data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    // boardId 가 유효할 때만 fetchBoard 호출
    if (boardId) fetchBoard();
  }, [boardId]);

  return {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeTitle,
    onClickPost,
    onClickUpdate,
    writerError,
    passwordError,
    titleError,
    contentsError,
    isActive,
    errMessage,
    boardId,
    prevData,
  };
};
