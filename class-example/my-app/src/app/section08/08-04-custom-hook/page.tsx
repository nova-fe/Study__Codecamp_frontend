'use client';

import { useLoginCheck } from '@/commons/hooks/08-04-use-login-check';

export default function CustomHookPage() {
  // 커스텀 훅 사용 (구조분해할당으로 loginCheck를 가져옴)
  const { loginCheck } = useLoginCheck();

  const onClickSubmit = () => {
    // 1. 로그인 체크
    loginCheck();

    //. 2. 결제하기
    // ...
  };

  // 구조분해할당 예시
  // function 과일바구니(사과, 바나나) {
  //   console.log(사과);
  //   console.log(바나나);
  // }
  // 과일바구니(2, 3);

  // // props
  // let 과일들 = { 사과:2 , 바나나: 3}

  // function 과일바구니(과일들) {
  //   console.log(과일들.사과);
  //   console.log(과일들.바나나);
  // }
  // 과일바구니({ 사과: 2, 바나나: 3 });

  return <button onClick={onClickSubmit}>결제하기</button>;
}
