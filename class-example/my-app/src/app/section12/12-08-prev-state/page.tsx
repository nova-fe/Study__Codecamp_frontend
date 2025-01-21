'use client'; // 리액트 구버전 방식으로 실행 (없으면 useState 못씀) => 신버전 방식은 뒤에서 배움

import { useState } from 'react';

export default function 카운터() {
  const [카운트변수, 카운트바꿔주는함수] = useState(0);

  const 카운트올리는함수 = () => {
    // 카운트바꿔주는함수(카운트변수 + 1); // 바로 바뀌는게 아닌 해당 함수가 끝난 뒤 카운트가 바뀜
    // 카운트바꿔주는함수(카운트변수 + 1);
    // 카운트바꿔주는함수(카운트변수 + 1); // => 결국 이것만 실행이 되어서 카운트변수에 + 1만 됨
    // => 최종결과: 1

    // prev: 이전 state 값
    카운트바꿔주는함수(prev => prev + 1); // 임시저장 공간을 사용해서 prev + 1을 해서 count: 1이 됨 (예시)임시저장공간  count: 0+1 -> count: 1
    카운트바꿔주는함수(prev => prev + 1); // prev 임시저장공간에 count가 1, count: 1+1 -> count: 2
    카운트바꿔주는함수(prev => prev + 1); // 임시저장공간 count: 2+1 -> count: 3
    // => 최종결과: 3
  };

  const 카운트내리는함수 = () => {
    카운트바꿔주는함수(카운트변수 - 1);
  };

  // 함수의 리턴은 1개만 가능
  return (
    <div>
      <div>{카운트변수}</div>
      <button onClick={카운트올리는함수}>카운트 올리기!</button>
      <button onClick={카운트내리는함수}>카운트 내리기!</button>
    </div>
  );
}
