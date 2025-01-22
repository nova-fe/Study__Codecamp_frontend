import { useEffect, ChangeEvent, useState, SyntheticEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createBoard, fetchBoard, updateBoard } from '@/api';
import {
  CreateBoardRequestSchema,
  CreateBoardResponseSchema,
  FetchBoardResponse,
  UpdateBoardRequestSchema,
} from '@/schemas';
import { IBoardIdParams } from './types';

export const useBoardsWrite = () => {
  const router = useRouter();
  const { boardId } = useParams<IBoardIdParams>();

  const [writer, setWriter] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const [writerError, setWriterError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [contentsError, setContentsError] = useState(false);

  const [isActive, setIsActive] = useState(false);

  // 얼럿
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // 얼럿 메세지
  const [alertMessage, setAlertMessage] = useState('Message');
  const alertMessageList = {
    error: '에러가 발생하였습니다. 다시 시도해 주세요.',
    falsePassword: '비밀번호를 확인해주세요.',
    checkPassword: '글을 작성할 때 입력하셨던 비밀번호를 입력해주세요.',
  };

  const errMessage = '필수입력 사항 입니다.';

  // 모달 열기/닫기 토글
  const toggleAlertOpen = () => {
    setIsAlertOpen(prev => !prev);
  };

  // 날짜를 연-월-일 로 변환
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const dateStr = new Date().toISOString();
  const dateFormatStr = formatDate(dateStr);

  const newData = {
    writer,
    password,
    title,
    contents,
    createdAt: dateStr, // ISO 8601 형식으로 날짜 저장
    date: dateFormatStr,
  };

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

  /**
   * 게시글 등록
   */
  const onClickPost = async () => {
    if (writer && password && title && contents) {
      setWriterError(false);
      setPasswordError(false);
      setTitleError(false);
      setContentsError(false);

      try {
        // 요청 데이터 검증
        const requestData = CreateBoardRequestSchema.parse(newData);
        // Firebase에 게시글 추가
        const data = await createBoard(requestData);
        // 응답 데이터 검증
        const responseData = CreateBoardResponseSchema.parse(data);

        // 게시글이 추가된 후, 해당 게시글의 ID로 이동
        const boardId = responseData.name; // Firebase가 반환하는 자동 생성된 ID
        router.push(`/boards/${boardId}`);
      } catch (error) {
        toggleAlertOpen();
        setAlertMessage(alertMessageList.error);
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

  /**
   * 게시글 수정(업데이트)
   */
  // 비밀번호 체크 입력 state
  const [checkPasswordInput, setCheckPasswordInput] = useState('');

  // 비밀번호 체크 입력값
  const onChangeCheckPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckPasswordInput(event.target.value);
  };

  // 모달 배경 클릭, esc 누를 경우 비밀번호 입력값 초기화
  const onClickAlertClose = (
    event: null,
    reason: 'backdropClick' | 'escapeKeyDown' | 'customClose',
  ) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setCheckPasswordInput('');
    }
    setCheckPasswordInput('');
    setIsAlertOpen(prev => !prev);
  };

  // 비밀번호 체크 모달 열기
  const onClickCheckPasswordOpen = () => {
    toggleAlertOpen(); // 모달 열기
    setAlertMessage(alertMessageList.checkPassword);

    // isConfirm true로 바꾸기
    setIsConfirm(true);
  };

  // 확인 버튼 클릭시 업데이트
  const onClickUpdate = async () => {
    if (checkPasswordInput === prevData?.password) {
      try {
        const updatedData = {
          ...prevData,
          title: title || prevData?.title,
          contents: contents || prevData?.contents,
        };
        // 요청 데이터 검증
        const requestData = UpdateBoardRequestSchema.parse(updatedData);
        // 게시글 업데이트
        await updateBoard(boardId, requestData);

        // 게시글이 추가된 후, 해당 게시글의 ID로 이동
        router.push(`/boards/${boardId}`);
      } catch (error) {
        toggleAlertOpen();
        setAlertMessage(alertMessageList.error);
        console.error('게시글 수정 실패:', error);
      }
    } else {
      // 얼럿 초기화
      onClickAlertClose(null, 'customClose');
      setIsConfirm(false);
      setCheckPasswordInput('');
      // 업데이트 실패 얼럿
      toggleAlertOpen();
      setAlertMessage(alertMessageList.falsePassword);
    }
  };

  // 기존 게시글 내용 가져오기
  const [prevData, setPrevData] = useState<FetchBoardResponse>();

  useEffect(() => {
    const loadBoard = async () => {
      try {
        // Firebase Realtime Database에서 해당 게시글 불러오기
        const data = await fetchBoard(boardId);

        setPrevData(data);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
      }
    };

    // boardId 가 유효할 때만 loadBoard 호출
    if (boardId) loadBoard();
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
    toggleAlertOpen,
    alertMessage,
    isAlertOpen,
    isConfirm,
    onChangeCheckPassword,
    onClickCheckPasswordOpen,
    onClickAlertClose,
  };
};
