'use client';

import React, { useState } from 'react';
import { Modal } from 'antd';
import DaumPostcodeEmbed from 'react-daum-postcode';

export default function ModalCustomPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleComplete = data => {
    // data 에 주소 정보들이 들어옴
    console.log(data);
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={showModal}>모달창 열기!</button>
      {/* 모달종료방식 - 1. 모달 숨김(ex, 이력서 등 닫아도 글이 날라가지 않아야 하는 경우) */}
      <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
        게시글 입력: <input type="text" />
      </Modal>

      {/* 모달종료방식 - 2. 모달 초기화(삭제) (ex, 신용카드, 비밀번호 등) */}
      {isModalOpen && ( // isModalOpen, open{true} 를 통한 모달창 초기화
        <Modal open={true} onOk={handleOk} onCancel={handleCancel}>
          <DaumPostcodeEmbed onComplete={handleComplete} />
        </Modal>
      )}
    </>
  );
}
