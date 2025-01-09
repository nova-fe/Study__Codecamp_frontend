import { Link } from 'react-router-dom';

const Aaa = () => {
  return (
    <>
      {/* 리액트의 이동방식: 현재페이지에서 JS로 태그만 이동(SPA) */}
      <h2>A페이지 입니다.</h2>
      <Link to="/bbb">B페이지로 이동!</Link>
    </>
  );
};

export default Aaa;
