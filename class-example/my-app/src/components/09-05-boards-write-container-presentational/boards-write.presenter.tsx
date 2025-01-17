'use client';

export default function BoardsWriteUI(props) {
  return (
    <>
      작성자:{' '}
      <input
        type="text"
        onChange={props.onChangeWriter}
        defaultValue={props.data?.writer}
      />{' '}
      <br />
      제목:{' '}
      <input
        type="text"
        onChange={props.onChangeTitle}
        defaultValue={props.data?.title}
      />{' '}
      <br />
      내용:{' '}
      <input
        type="text"
        onChange={props.onChangeContents}
        defaultValue={props.data?.contents}
      />{' '}
      <br />
      <button
        onClick={
          props.isEdit
            ? () => props.onClickUpdate(props.number)
            : props.onClickSubmit
        }
      >
        {props.isEdit ? '수정' : '등록'}
      </button>
    </>
  );
}
