'use client';

import { Modal } from 'antd';

export default function ModalAlertPage() {
  const onClickSuccess = () => {
    Modal.success({
      content: '게시글 등록 성공',
    });
  };

  const onClickError = () => {
    Modal.error({
      content: '게시글 등록 실패',
    });
  };
  return (
    <div>
      <button onClick={onClickSuccess}>성공했을때!!!</button>
      <button onClick={onClickError}>실패!!!!!</button>
    </div>
  );
}
