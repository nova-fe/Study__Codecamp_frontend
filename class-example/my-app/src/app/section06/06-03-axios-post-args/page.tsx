"use client"

import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function AxiosPage() {
  const [writer, setWriter] = useState("");  
  const [password, setPassword] = useState("");  
  const [title, setTitle] = useState("");  
  const [contents, setContents] = useState("");

  const data = {
    writer,
    password,
    title,
    contents
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

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }



  // 한 줄일 때는 괄호() 필요 없음
  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} /> <br/>
      비밀번호: <input type="password" onChange={onChangePassword} /> <br/>
      제목: <input type="text" onChange={onChangeTitle} /> <br/>
      내용: <input type="text" onChange={onChangeContents} /> <br/>
      <button onClick={onClickSubmit}>게시글 등록 요청하기</button>
    </>
  )
}