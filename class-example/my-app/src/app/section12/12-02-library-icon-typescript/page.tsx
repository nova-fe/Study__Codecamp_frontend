'use client';

import { CloseCircleOutlined } from '@ant-design/icons';
import { MouseEvent } from 'react';

export default function LibraryIconPage() {
  // 대부분의 아이콘 라이브러리는 span 태그를 부모로 하여 이미지가 자식으로 들어감
  // => 이미지 클릭시, 부모로 onClick 이벤트 전파 -> 실행안됨
  const onClickDelete = (event: MouseEvent<HTMLSpanElement>) => {
    // alert(`${event.target.id} 를 정말로 삭제합니까?`); // 작동하지 않음
    alert(`${event.currentTarget.id} 를 정말로 삭제합니까?`);
  };

  return (
    <>
      <CloseCircleOutlined id="idaaa" onClick={onClickDelete} />
    </>
  );
}
