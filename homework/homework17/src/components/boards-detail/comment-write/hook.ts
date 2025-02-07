'use client';

import { createComment, fetchComment } from '@/api';
import {
  CreateCommentRequest,
  CreateCommentResponseSchema,
  FetchCommentResponse,
} from '@/schemas';
import { ChangeEvent, useState, useEffect } from 'react';
import { ICommentWriteProps } from './types';

export const useCommentWrite = ({ comment }: ICommentWriteProps) => {
  // 데이터 state
  const [commentData, setCommentData] = useState<CreateCommentRequest>({
    writer: '',
    password: '',
    contents: '',
    rating: 0,
    createdAt: new Date().toISOString(),
  });
  // 기존 댓글 내용 가져오기
  const [prevCommentData, setPrevCommentData] =
    useState<FetchCommentResponse>();
  const commentId: string = comment?.commentId;

  // 에러 상태
  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contentsError, setContentsError] = useState(false);

  // 활성 상태
  const [isActive, setIsActive] = useState(false);

  // 데이터 전송 상태
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 얼럿
  const [isConfirm, setIsConfirm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCommentPasswordAlertOpen, setIsCommentPasswordAlertOpen] =
    useState(false);

  // 얼럿 메세지
  const [alertMessage, setAlertMessage] = useState('Message');
  const alertMessageList = {
    required: '필수입력 사항 입니다',
    error: '에러가 발생하였습니다.',
    success: '댓글이 등록되었습니다.',
    falsePassword: '비밀번호를 확인해주세요.',
    checkPassword: '글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.',
  };

  // 모달 열기/닫기 토글
  const toggleAlertOpen = (alertId: string) => {
    if (alertId === 'successAlert') {
      setIsAlertOpen(prev => !prev);
      setIsCommentPasswordAlertOpen(false);
    } else if (alertId === 'passwordAlert') {
      setIsAlertOpen(false);
      setIsCommentPasswordAlertOpen(prev => !prev);
    }
  };

  /**
   * 입력폼 onChange
   */
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentData({
      ...commentData,
      writer: event.target.value,
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (event.target.value && commentData.contents && commentData.password) {
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
    if (commentData.writer && commentData.contents && event.target.value) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData(prev => {
      const updatedData = {
        ...prev,
        contents: event.target.value,
      };

      // 모든 입력폼이 입력 되어있는지 확인
      setIsActive(
        event.target.value && updatedData.writer && updatedData.password
          ? true
          : false,
      );

      return updatedData;
    });
  };

  const onChangeRating = (value: number | null) => {
    setCommentData({
      ...commentData,
      rating: value ?? 0, // value 가 null 이면 0으로 처리
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (commentData.writer && commentData.contents && commentData.password) {
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
    if (commentData.writer && commentData.contents && commentData.password) {
      // 에러들을 전부 false 로 변환
      setWriterError(false);
      setPasswordError(false);
      setContentsError(false);

      try {
        // 댓글 등록 요청
        const response = await createComment(commentData);
        // console.log(response); // 고유 ID 반환 ({name: '고유ID'})

        // 응답 데이터 검증
        const responseData = CreateCommentResponseSchema.parse(response);
        console.log(responseData);

        // 댓글 성공 얼럿
        toggleAlertOpen('successAlert');
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
        setIsActive(false);
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
      if (!commentData.contents) {
        setContentsError(true);
      } else {
        setContentsError(false);
      }
    }
  };

  /**
   * 기존 댓글 가져오기
   */
  useEffect(() => {
    const loadComment = async () => {
      try {
        const data = await fetchComment(commentId);

        setPrevCommentData(data);
      } catch (error) {
        console.log('댓글 조회 실패', error);
      }
    };

    if(commentId) loadComment();
  },[commentId]);


  /**
   * 댓글 수정(업데이트)
   */
  // 비밀번호 체크
  const [checkCommentPasswordInput, setCheckCommentPasswordInput] =
    useState('');

  // 비밀번호 체크 입력값
  const onChangeCheckCommentPassword = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setCheckCommentPasswordInput(event.target.value);
  };

  // 모달 배경 클릭, esc 누를 경우 비밀번호 입력값 초기화
  const onClickAlertClose = (
    event: null,
    reason: 'backdropClick' | 'escapeKeyDown' | 'customClose',
  ) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setCheckCommentPasswordInput('');
    }
    setCheckCommentPasswordInput('');
    setIsCommentPasswordAlertOpen(prev => !prev);
  };

  // 비밀번호 체크 모달 열기
  const onClickCheckCommentPasswordOpen = () => {
    toggleAlertOpen('passwordAlert');
    setAlertMessage(alertMessageList.checkPassword);

    // isConfirm true로 바꾸기
    setIsConfirm(true);
  };

  // 확인 버튼 클릭시 댓글 수정(업데이트)
  const onClickCommentUpdate = async () => {
    // 입력 비밀번호가 기존 비밀번호와 동일한 경우
    if (checkCommentPasswordInput === prevCommentData?.password) {
      try {
        
      } catch (error) {
        console.error("댓글 수정 실패!!!", error);
      }
    }
  }

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

  // console.log(📌수정 댓글의 commentId: ` + commentId);

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
    contentsError,
    alertMessage,
    isAlertOpen,
    alertMessageList,
    toggleAlertOpen,
  };
};
