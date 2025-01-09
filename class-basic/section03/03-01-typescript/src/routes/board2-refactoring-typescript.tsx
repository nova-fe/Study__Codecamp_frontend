import { ChangeEvent, MouseEvent, useState } from 'react';

const Board = () => {
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);

    if (event.target.value && title && content !== '') return setIsActive(true);
    setIsActive(false);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (writer && event.target.value && content !== '')
      return setIsActive(true);
    setIsActive(false);
  };
  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);

    if (writer && title && event.target.value !== '') return setIsActive(true);
    setIsActive(false);
  };

  const onClickSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(writer);
    alert('등록되었습니다');
  };

  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} />
      제목: <input type="text" onChange={onChangeTitle} />
      내용: <input type="text" onChange={onChangeContent} />
      <button
        onClick={onClickSubmit}
        style={{ backgroundColor: isActive ? 'yellow' : 'gray' }}
      >
        등록하기
      </button>
    </>
  );
};

export default Board;
