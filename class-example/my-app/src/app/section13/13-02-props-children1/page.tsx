'use client';

import MyBox from '@/components/13-02-props-children1';

export default function Page() {
  // 1. children 넘기기 1번째 방식
  // return (
  //   <>
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //     <MyBox children={<button>버튼1</button>} />
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //   </>
  // );

  // 2. children 넘기기 2번째 방식
  return (
    <>
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
      <MyBox>
        {/** 태그 안에 자식으로 들어가는 다른 태그들은 props.children 이라는 형태의 props로 들어감 */}
        <button>버튼2</button>
      </MyBox>
      <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
    </>
  );

  // 3. 만약, 둘 다 있으면...?
  // return (
  //   <>
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //     {/* 태그 안의 것이 덮어씌워지므로 버튼3은 보이지 않음 */}
  //     <MyBox children={<button>버튼3</button>}>
  //       {/** 태그 안에 자식으로 들어가는 다른 태그들은 props.children 이라는 형태의 props로 들어감 */}
  //       <button>버튼2</button>
  //     </MyBox>
  //     <div>++++++++ (페이지) 철수 영희 훈이 ++++++++</div>
  //   </>
  // );
}
