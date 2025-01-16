'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BoardsNew = () => {
  const router = useRouter();

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

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <div className="mb-10 text-xl font-bold">게시물 등록</div>
        <div className="">
          {/* 작성자, 비밀번호 */}
          <div className="flex gap-10 border-b border-b-gray-300 pb-10">
            <div className="flex basis-1/2 flex-col">
              <label className="label-text mb-2">
                작성자<span className="text-red-500"> *</span>
              </label>
              <input
                className="input-primary"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeWriter}
              />
              {writerError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
            <div className="flex basis-1/2 flex-col">
              <label className="label-text mb-2">
                비밀번호<span className="text-red-500"> *</span>
              </label>
              <input
                type="password"
                className="input-primary"
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChangePassword}
              />
              {passwordError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">
                제목<span className="text-red-500"> *</span>
              </label>
              <input
                className="input-primary"
                placeholder="제목을 입력해 주세요."
                onChange={onChangeTitle}
              />
              {titleError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 내용 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">
                내용<span className="text-red-500"> *</span>
              </label>
              <textarea
                className="input-primary h-[22rem] resize-none"
                placeholder="내용을 입력해 주세요."
                onChange={onChangeContents}
              ></textarea>
              {contentsError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 주소 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">주소</label>
              <div className="mb-2 flex">
                <input
                  className="input-primary mr-2 w-20"
                  placeholder="01234"
                />
                <button className="btn-black btn-md">우편번호 검색</button>
              </div>
              <input
                className="input-primary mb-2"
                placeholder="주소를 입력해 주세요."
              />
              <input className="input-primary" placeholder="상세주소" />
            </div>
          </div>

          {/* 유튜브 링크 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">유튜브 링크</label>
              <input
                className="input-primary"
                placeholder="제목을 입력해 주세요."
              />
            </div>
          </div>

          {/* 사진 첨부 */}
          <div className="py-10">
            <div className="flex flex-col">
              <label className="label-text mb-2">사진 첨부</label>
              <div className="flex gap-4">
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-4">
            <button className="btn-black btn-md">취소</button>
            <button
              className={`${isActive ? 'btn-primary' : 'btn-gray'} btn-md`}
              onClick={onClickPost}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardsNew;
