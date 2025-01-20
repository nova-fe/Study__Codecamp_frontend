'use client';
import React, { useState } from 'react';
import { Rate } from 'antd';

export default function LibraryStarPage() {
  const [value, setValue] = useState(3);

  // === 1단계 방식 ===> onChange는 Antd 개발자들이 만든 가짜 onChange 임
  // const onChangeStar = (value) => {
  //   // let value = 5 와 같은 형식

  //   setValue(value);
  // }

  // === 2단계 방식 ===
  // => 중괄호와 return 사이에 아무것도 없으면 소괄호로 변경 가능 -> 특별한 의미 없으면 소괄호 생략 가능
  // const onChangeStar = value => setValue(value);

  // === 3단계 방식 ===
  // return <Rate onChange={value => setValue(value)} value={value} />;

  // === 4단계 방식 ===
  // value => setValue(value) 에서 value 가 동일(받았던걸 그대로 실행)  하면 setValue로 생략 가능
  return <Rate onChange={setValue} value={value} />;

  // return <Rate onChange={setValue} value={value} />;
}
