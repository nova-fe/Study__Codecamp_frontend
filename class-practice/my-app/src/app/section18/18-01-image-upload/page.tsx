"use client"

import { useState } from "react";

export default function ImageUploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  
  const onChangeFile = (event) => {
      const file = event.target.files[0];  // 배열로 들어오는 이유: <input type="file" multiple /> 일 때, 파일을 여러개 선택 가능
      console.log(file);
  }

  return (
    <>
      <input type="file" onChange={onChangeFile} />
      <img src="" />
    </>
  )
};
