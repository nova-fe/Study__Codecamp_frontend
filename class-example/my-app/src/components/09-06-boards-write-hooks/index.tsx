'use client';

import { useBoardsWrite } from './hook';

export default function BoardsWrite(props) {
  const {
    onChangeWriter,
    onChangeTitle,
    onChangeContents,
    onClickUpdate,
    onClickSubmit,
    number,
  } = useBoardsWrite(props);

  return (
    <>
      작성자:{' '}
      <input
        type="text"
        onChange={onChangeWriter}
        defaultValue={props.data?.writer}
      />{' '}
      <br />
      제목:{' '}
      <input
        type="text"
        onChange={onChangeTitle}
        defaultValue={props.data?.title}
      />{' '}
      <br />
      내용:{' '}
      <input
        type="text"
        onChange={onChangeContents}
        defaultValue={props.data?.contents}
      />{' '}
      <br />
      <button
        onClick={props.isEdit ? () => onClickUpdate(number) : onClickSubmit}
      >
        {props.isEdit ? '수정' : '등록'}
      </button>
    </>
  );
}
