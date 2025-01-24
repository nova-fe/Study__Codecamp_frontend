'use client';

import MyBox from '@/components/13-01-props';

export default function Page() {
  // 1. props로 값 넘기기
  // return (
  //   <>
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //     <MyBox apple={3} />
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //   </>
  // );

  // 2. props로 JSX 넘기기
  return (
    <>
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
      <MyBox apple={<button>버튼</button>} />
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
    </>
  );
}
