import { useState } from 'react';

const Board = () => {
  const [writer, setWriter] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(false);

  const onChangeWriter = e => {
    setWriter(e.target.value);

    if (e.target.value !== '' && title !== '' && content !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeTitle = e => {
    setTitle(e.target.value);

    if (writer !== '' && e.target.value !== '' && content !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  const onChangeContent = e => {
    setContent(e.target.value);

    if (writer !== '' && title !== '' && e.target.value !== '') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onClickSubmit = () => {
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
