"use client"

export default function RestGetPage() {
  
  // REST-API 비동기 통신
  const onClickAsync = () => {
      const result = fetch("http://main-example.codebootcamp.co.kr/board/1")
      console.log(result) // Promise
  }

  // REST-API 동기 통신(async/awiat)
  const onClickSync = async () => {
    const result = await fetch("http://main-example.codebootcamp.co.kr/board/1")
    const data = await result.json()
    console.log(data);
    console.log(data.title);
  }

  return(
    <div>
      <button onClick={onClickAsync}>REST-API(비동기) 요청하기</button>
      <button onClick={onClickSync}>REST-API(동기) 요청하기</button>
    </div>
  )
};