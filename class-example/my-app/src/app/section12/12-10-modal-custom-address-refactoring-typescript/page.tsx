'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode'; // Address: daum-postcode 에서 전달해주는 data의 타입 -> typescript를 위해 사용

export default function ModalCustomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    onToggleModal();
  };

  return (
    <>
      <button onClick={onToggleModal}>모달창 열기!</button>
      {/* 모달종료방식 - 1. 모달 숨김(ex, 이력서 등 닫아도 글이 날라가지 않아야 하는 경우) */}
      {/* <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
        게시글 입력: <input type="text" />
      </Modal> */}

      {/* 모달종료방식 - 2. 모달 초기화(삭제) (ex, 신용카드, 비밀번호 등) */}
      {isModalOpen && ( // isModalOpen, open{true} 를 통한 모달창 초기화
        <Modal open={true} onOk={onToggleModal} onCancel={onToggleModal}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
