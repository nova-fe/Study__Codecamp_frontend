'use client'; // 리액트 구버전 방식으로 실행 (없으면 useState 못씀) => 신버전 방식은 뒤에서 배움

import { useState } from 'react';

export default function 카운터() {
  const [카운트변수, 카운트바꿔주는함수] = useState(0);

  const 카운트올리는함수 = () => {
    // 1. 기본방법
    카운트바꿔주는함수(prev => prev + 1);

    // // 2. 함수선언식
    // 카운트바꿔주는함수(function(prev) {
    //   // 로직 추가 가능(if() 등)
    //   return prev + 1;
    // });

    // // 3. 매개변수 변경 가능
    // 카운트바꿔주는함수((abcde) => abcde + 1);
  };
  
  return (
    <div>
      <div>{카운트변수}</div>
      <button onClick={카운트올리는함수}>카운트 올리기!</button>
    </div>
  );
}
