import Link from 'next/link'

const Aaa = () => {
  return (
    <>
      {/* 리액트의 이동방식: 현재페이지에서 JS로 태그만 이동(SPA) */}
      <h2>A페이지 입니다.</h2>
      <Link href="/section04/04-01-bbb">B페이지로 이동!</Link>
    </>
  );
};

export default Aaa;
