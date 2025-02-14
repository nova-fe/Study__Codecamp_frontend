'use client';

import {
  CreateCommentRequest,
  FetchCommentResponse,
} from '@/schemas';
import { ChangeEvent, useState, useEffect } from 'react';
import { ICommentWriteProps } from './types';
import { useComments } from '../hooks/useComments';

export const useCommentWrite = ({ isEdit, setIsEdit, prevCommentData, commentId }: ICommentWriteProps) => {
  const { addComment, updateComment } = useComments(); // '-OH901XYZ3ABC2'
  // 데이터 state
  const [newCommentData, setNewCommentData] = useState<CreateCommentRequest>({
    writer: '',
    password: '',
    contents: '',
    rating: 5,
    createdAt: new Date().toISOString(),
  });

  // 에러 상태
  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [contentsError, setContentsError] = useState(false);

  // 활성(입력) 상태
  const [isActive, setIsActive] = useState(false);

  // 데이터 전송 상태
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  // 수정시 비밀번호 같음 상태
  const [isSuccessPassword, setIsSuccessPassword] = useState(false);

  // 얼럿
  const [isConfirm, setIsConfirm] = useState(false);
  const [isAddSuccessAlertOpen, setIsAddSuccessAlertOpen] = useState(false);
  const [isUpdateAlertOpen, setIsUpdateAlertOpen] = useState(false);

  // 얼럿 메세지
  const [alertMessage, setAlertMessage] = useState('Message');
  const alertMessageList = {
    required: '필수입력 사항 입니다',
    error: '에러가 발생하였습니다.',
    success: '댓글이 등록되었습니다.',
    successUpdate: '수정되었습니다.',
    falsePassword: '비밀번호를 확인해주세요.',
    checkPassword: '글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.',
  };

  // 모달 열기/닫기 토글
  const toggleAlertOpen = (alertId: string) => {
    if (alertId === 'successAlert') { // 등록
      setIsAddSuccessAlertOpen(prev => !prev);
      setIsUpdateAlertOpen(false);
    } else if (alertId === 'successUpdate') { // 수정
      setIsUpdateAlertOpen(prev => !prev);
      setIsAddSuccessAlertOpen(false);
    }
  };

  /**
   * 입력폼 onChange
   */
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCommentData({
      ...newCommentData,
      writer: event.target.value,
    });
    // 모든 입력폼이 입력 되어있는지 확인
    if (event.target.value && newCommentData.contents && newCommentData.password) {
      return setIsActive(true);
    }
    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCommentData({
      ...newCommentData,
      password: event.target.value,
    });

    // 모든 입력폼이 입력 되어있는지 확인
    if (newCommentData.writer && newCommentData.contents && event.target.value) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };
  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewCommentData(prev => {
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
    setNewCommentData({
      ...newCommentData,
      rating: value ?? 0, // value 가 null 이면 0으로 처리
    });
    // 모든 입력폼이 입력 되어있는지 확인
    if (newCommentData.writer && newCommentData.contents && newCommentData.password) {
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
    if (newCommentData.writer && newCommentData.contents && newCommentData.password) {
      // 에러들을 전부 false 로 변환
      setWriterError(false);
      setPasswordError(false);
      setContentsError(false);

      try {
        // ✅ 댓글 등록
        addComment(newCommentData);

        // 댓글 성공 얼럿
        toggleAlertOpen('successAlert');
        setAlertMessage(alertMessageList.success);

        // 댓글 입력폼 초기화
        setNewCommentData({
          writer: '',
          password: '',
          contents: '',
          rating: 5,
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
      if (!newCommentData.writer) {
        setWriterError(true);
      } else {
        setWriterError(false);
      }
      if (!newCommentData.password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (!newCommentData.contents) {
        setContentsError(true);
      } else {
        setContentsError(false);
      }
    }
  };

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

    // 모든 입력폼이 입력 되어있는지 확인
    if (newCommentData.contents && event.target.value) {
      return setIsActive(true);
    }

    // 입력이 되어있지 않다면 false
    return setIsActive(false);
  };

  // 수정하기 버튼 클릭시 댓글 수정(업데이트)
  const onClickCommentUpdate = async () => {
    // 모든 입력폼이 입력 되어있는지 확인
    if (newCommentData.contents || prevCommentData?.contents && checkCommentPasswordInput) {
      // 에러들을 전부 false 로 변환
      setPasswordError(false);
      setContentsError(false);
      
      // 입력 비밀번호가 기존 비밀번호와 동일한 경우
      if (checkCommentPasswordInput === prevCommentData?.password) {
        try {
          const updatedData = {
            ...prevCommentData,
            rating: newCommentData.rating || prevCommentData?.rating,
            contents: newCommentData.contents || prevCommentData?.contents,
          }

          setIsSuccessPassword(true);

          // 댓글 업데이트
          updateComment(commentId, updatedData);

          // 수정 성공 얼럿
          toggleAlertOpen('successUpdate');
          setAlertMessage(alertMessageList.successUpdate);

          // 댓글 데이터 입력 상태 true로 변경
          setIsUpdated(true);
          setIsActive(false);

          console.log('댓글 수정 성공');
        } catch (error) {
          setIsSuccessPassword(false);
          console.error("댓글 수정 실패", error);
        }
      } else {
        setIsConfirm(false);
        setCheckCommentPasswordInput("");
        // 업데이트 실패 얼럿
        toggleAlertOpen('successUpdate');
        setAlertMessage(alertMessageList.falsePassword);
      }
    } else {
      if (!newCommentData.password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
      if (!newCommentData.contents) {
        setContentsError(true);
      } else {
        setContentsError(false);
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


  /**
   * 댓글 수정 후 리렌더링
   */
  useEffect(() => {
    if(isUpdated) {
      setIsUpdated(false);
      setIsEdit(false);
    }
  }, [isUpdated, isEdit]); // isSubmitted 가 변경 될 때마다 실행

  // console.log(📌수정 댓글의 commentId: ` + commentId);

  return {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    onChangeRating,
    newCommentData,
    isActive,
    writerError,
    passwordError,
    contentsError,
    alertMessage,
    isAddSuccessAlertOpen,
    alertMessageList,
    toggleAlertOpen,
    isConfirm,
    onChangeCheckCommentPassword,
    onClickCommentUpdate,
    isUpdateAlertOpen,
    isSuccessPassword
  };
};
