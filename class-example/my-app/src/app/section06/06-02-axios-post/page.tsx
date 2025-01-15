"use client"

import axios from "axios";

export default function AxiosPage() {

  const data = {
    writer: "Nova",
    password: 1234,
    title: "게시글 등록 테스트2",
    contents: "테스트 입니다2."
  }


  const onClickSubmit = () => {
    axios.post("http://main-example.codebootcamp.co.kr/board", data)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error);
    })
  }

  // 한 줄일 때는 괄호() 필요 없음
  return <button onClick={onClickSubmit}>axios 등록 요청하기</button>
}