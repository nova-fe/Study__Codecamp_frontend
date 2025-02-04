'use client';

import { createComment } from '@/api';
import { CreateCommentRequest, CreateCommentResponseSchema } from '@/schemas';
import { ChangeEvent, useState, useEffect } from 'react';

export const useCommentWrite = () => {
  // 데이터 state
  const [commentData, setCommentData] = useState<CreateCommentRequest>({
    writer: '',
    password: '',
    contents: '',
    rating: 0,
    createdAt: new Date().toISOString(),
  });

  // 에러 상태
  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const alertMessage = '필수입력 사항 입니다'; // 에러 메세지

  // 활성 상태
  const [isActive, setIsActive] = useState(false);

  // 데이터 전송 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 얼럿
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const toggleAlertOpen = () => {
    setIsAlertOpen(prev => !prev);
  };

  // 얼럿 메세지
  const alertMessageList = {
    required: '필수입력 사항 입니다',
    error: '에러가 발생하였습니다.',
    success: '댓글이 등록되었습니다.',
  };
  const [alertMessage, setAlertMessage] = useState('Message');

  /**
   * 입력폼 onChange
   */
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentData({
      ...commentData,
      writer: event.target.value,
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (event.target.value && commentData.password) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentData({
      ...commentData,
      password: event.target.value,
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (commentData.writer && event.target.value) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData({
      ...commentData,
      contents: event.target.value,
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (commentData.writer && commentData.password) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  const onChangeRating = (value: number | null) => {
    setCommentData({
      ...commentData,
      rating: value ?? 0, // value 가 null 이면 0으로 처리
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (commentData.writer && commentData.password) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  /**
   * 댓글 등록
   */
  const onClickPostComment = async () => {
    // 값들이 모두 안 비어있는지 확인
    if (commentData.writer && commentData.password) {
      // 에러들을 전부 false 로 변환
      setWriterError(false);
      setPasswordError(false);

      try {
        // 댓글 등록 요청
        const response = await createComment(commentData);
        // console.log(response); // 고유 ID 반환 ({name: '고유ID'})

        // 응답 데이터 검증
        const responseData = CreateCommentResponseSchema.parse(response);
        console.log(responseData);

        // 댓글 성공 얼럿
        toggleAlertOpen();
        setAlertMessage(alertMessageList.success);

        // 댓글 입력폼 초기화
        setCommentData({
          writer: '',
          password: '',
          contents: '',
          rating: 0,
          createdAt: new Date().toISOString(),
        });

        // 댓글 데이터 입력 상태 true로 변경
        // -> 의존성 배열에 isSubmitted가 있는 useEffect 가 실행됨
        setIsSubmitted(true);
      } catch (error) {
        setAlertMessage(alertMessageList.error);
        console.error('댓글 등록 실패: ', error);
      }
    } else {
      if (!commentData.writer) {
        setWriterError(true);
      } else {
        setWriterError(false);
      }
      if (!commentData.password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  /**
   * 댓글 등록 후 입력폼 초기화
   */
  // (비동기 작업 후 화면 재렌더링)
  useEffect(() => {
    // isSubmitted 가 변경되면 실행
    // (화면이 재렌더링 됨 -> 변경된 commentData가 화면에 적용됨)

    // 만약 데이터가 전송(true) 됐다면
    if (isSubmitted) {
      setIsSubmitted(false); //  다시 데이터 전송 상태를 false 로 변경(초기화)
    }
  }, [isSubmitted]); // isSubmitted 가 변경 될 때마다 실행

  return {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    onChangeRating,
    commentData,
    isActive,
    writerError,
    passwordError,
    alertMessage,
    isAlertOpen,
    alertMessageList,
    toggleAlertOpen,
  };
};
