"use client"

export default function MapElPage() {
  // 1. 기본방법
  ["철수","영희","훈이"].forEach((el, index) => {
    console.log("el: ", el);
    console.log("index: ", index);
  });

  console.log("==================================================");

  // 2. 매개변수 변경 방법
  ["철수","영희","훈이"].forEach((aaa, bbb) => {
    console.log("el: ", aaa);
    console.log("index: ", bbb);
  }); 

  console.log("==================================================");

  // 3. 함수 선언식
  ["철수","영희","훈이"].forEach(function (aaa, bbb) {
    console.log("el: ", aaa);
    console.log("index: ", bbb);
  }); 

  console.log("==================================================");

  // 4. el과 index 바꾸기
  ["철수","영희","훈이"].forEach((index, el) => {
    console.log("el: ", el);
    console.log("index: ", index);
  });


  return <></>
};
