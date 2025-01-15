'use client';

import { ChangeEvent, useState } from 'react';
import axios from 'axios';

const BoardsNew = () => {
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

  const onClickPost = () => {
    if (writer && password && title && contents) {
      setWriterError(false);
      setPasswordError(false);
      setTitleError(false);
      setContentsError(false);

      axios
        .post('http://main-example.codebootcamp.co.kr/board', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });

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
      <div className="container max-w-screen-xl mx-auto py-10">
        <div className="font-bold text-xl mb-10">게시물 등록</div>
        <div className="">
          {/* 작성자, 비밀번호 */}
          <div className="flex gap-10 pb-10 border-b border-b-gray-300">
            <div className="flex flex-col basis-1/2">
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
            <div className="flex flex-col basis-1/2">
              <label className="label-text mb-2">
                비밀번호<span className="text-red-500"> *</span>
              </label>
              <input
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
          <div className="py-10 border-b border-b-gray-300">
            <div className="flex flex-col basis-full">
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
          <div className="py-10 border-b border-b-gray-300">
            <div className="flex flex-col basis-full">
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
          <div className="py-10 border-b border-b-gray-300">
            <div className="flex flex-col basis-full">
              <label className="label-text mb-2">주소</label>
              <div className="flex mb-2">
                <input
                  className="w-20 input-primary mr-2"
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
          <div className="py-10 border-b border-b-gray-300">
            <div className="flex flex-col basis-full">
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
                <button className="rounded-lg size-40 bg-gray-100 text-gray-600 bg-plus-icon bg-no-repeat bg-[bottom_5rem_center] leading-[14rem] tracking-tighter">
                  클릭해서 사진 업로드
                </button>
                <button className="rounded-lg size-40 bg-gray-100 text-gray-600 bg-plus-icon bg-no-repeat bg-[bottom_5rem_center] leading-[14rem] tracking-tighter">
                  클릭해서 사진 업로드
                </button>
                <button className="rounded-lg size-40 bg-gray-100 text-gray-600 bg-plus-icon bg-no-repeat bg-[bottom_5rem_center] leading-[14rem] tracking-tighter">
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
