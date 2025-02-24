'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FunctionalCounterPage() {
  const [count, setCount] = useState<number>(1);

  // 1. useEffect 하나로 합치기
  useEffect(() => {
    // 실행순서1. 등록만 함(실행은 되지 않음)
    // 실행순서5. JSX가 그려진 뒤 실행됨
    console.log('그려지고 나서 실행!!');

    return () => {
      console.log('사라지기 전에 실행!!');
    };
  }, []); // props나 state 같은 것들이 의존성 배열에 들어가야함

  // 2. useEffect 잘못된 사용법(1. 추가렌더링, 2. 무한루프)
  // useEffect(() => {
  //   setCount(prev => prev + 1); // 1. 컴포넌트가 한번 그려지고나서 setCount가 실행됨 -> state가 변경되었으므로 리렌더링
  // }, [count]);  // 2. count가 바뀌었으므로 다시 리렌더링 -> 리렌더링이 되면서 다시 useEffect가 실행되고 setCount가 실행... 의 무한루프

  const onClickCountUp = () => {
    // 실행순서2. 등록만 함(실행은 되지 않음)
    setCount(count + 1);
  };

  console.log('나는 언제 실행되게~?'); // 실행순서3. console에 찍힘 // 카운트 올리는 버튼 클릭시 또 실행

  return (
    // 실행순서4. JSX가 그려짐
    <>
      <div>{count}</div>
      <button onClick={onClickCountUp}>카운트 올리는 버튼!!!</button>

      <Link href={'/'}>나가기 버튼!!</Link>
    </>
  );
}
