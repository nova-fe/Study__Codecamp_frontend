'use client';

import MyBox from '@/components/13-04-props-children2-typescript';

export default function Page() {
  return (
    <>
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
      {/** 쏙 들어가기! 땡겨오기! */}
      <MyBox school="다람쥐초등학교">
        {/** 태그 안에 자식으로 들어가는 다른 태그들은 props.children 이라는 형태의 props로 들어감 */}
        <div>
          <input />
          <button>버튼2</button>
          <div>안녕하세요!</div>
        </div>
      </MyBox>
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
    </>
  );
}
