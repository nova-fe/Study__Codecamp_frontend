import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

export const useBoardsWrite = props => {
  const router = useRouter();
  const { boardId } = useParams();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentsError, setContentsError] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const data = {
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
          data,
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
  const onClickUpdate = boardId => {
    try {
      const updatedData = {
        ...props.data,
        title: title || props.data?.title,
        contents: contents || props.data?.contents,
      };

      axios.patch(
        `https://nova-codecamp-board-default-rtdb.firebaseio.com/homework/${boardId}.json`,
        updatedData,
      );

      alert('게시글 수정이 완료되었습니다.');
      router.push(`/boards/${boardId}`);
    } catch (error) {
      alert('에러가 발생하였습니다. 다시 시도해 주세요.');
      console.error('게시글 수정 실패:', error);
    }
  };

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
  };
};
