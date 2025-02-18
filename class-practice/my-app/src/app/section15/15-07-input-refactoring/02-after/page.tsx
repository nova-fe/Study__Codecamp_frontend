"use client"

import { ChangeEvent, useState } from "react";
import axios from "axios";

export default function AxiosPage() {
  const [inputs, setInputs] = useState({
    writer: "",
    title: "",
    password: "",
    contents: ""
  })

  const data = {
    // writer: inputs.writer,
    // password: inputs.password,
    // title: inputs.title,
    // content: inputs.contents
    ...inputs
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

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <>
      작성자: <input id="writer" type="text" onChange={onChangeInput} /> <br/>
      비밀번호: <input id="password" type="password" onChange={onChangeInput} /> <br/>
      제목: <input id="title" type="text" onChange={onChangeInput} /> <br/>
      내용: <input id="contents" type="text" onChange={onChangeInput} /> <br/>
      <button onClick={onClickSubmit}>게시글 등록 요청하기</button>
    </>
  )
}