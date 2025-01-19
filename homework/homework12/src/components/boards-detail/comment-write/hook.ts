import { ChangeEvent, useState } from 'react';

export const useCommentWrite = () => {
  // 데이터 state
  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [contents, setContents] = useState('');
  const [rating, setRating] = useState(0);

  // 에러 상태
  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const errMessage = '필수입력 사항 입니다'; // 에러 메세지

  // 활성 상태
  const [isActive, setIsActive] = useState(false);

  const dateStr = new Date().toISOString();

  // 데이터
  const commentData = {
    writer,
    password,
    contents,
    rating,
    createdAt: dateStr,
  };

  /**
   * 입력폼 onChange
   */
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    // 모든 입력폼이 입력 되어있는지 확인
    if (event.target.value && password) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    // 모든 입력폼이 입력 되어있는지 확인
    if (writer && event.target.value) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);

    // 모든 입력폼이 입력 되어있는지 확인
    if (writer && password) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  // const onChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
  //   setWriter(event.target.value);
  // };

  /**
   * 댓글 등록
   */
  const onClickPostComment = async () => {
    // 값들이 모두 안 비어있는지 확인
    if (writer && password) {
      // 에러들을 전부 false 로 변환
      setWriterError(false);
      setPasswordError(false);

      try {
        console.log(commentData);
      } catch (error) {
        alert('에러가 발생하였습니다.');
        console.error('댓글 등록 실패: ', error);
      }
    } else {
      if (!writer) {
        setWriterError(true);
      } else {
        setWriterError(false);
      }
      if (!password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  return {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    isActive,
    writerError,
    passwordError,
    errMessage,
  };
};
