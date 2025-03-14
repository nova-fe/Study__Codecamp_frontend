// 이미지 있는 게시글 수정: http://localhost:3000/boards/-OLDX5n_McwGWu5j_9G7/edit
// 이미지: https://firebasestorage.googleapis.com/v0/b/nova-codecamp-board.firebasestorage.app/o/images%2Fhomework%2Frow_image2.jpg?alt=media&token=219ae39e-a69b-47e0-80e0-88bfb2c81a8f

import { useRef, ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { IImageItemProps } from './type';
import { fileValidator } from '@/commons/libraries/fileValidator';

export const useImageItem = ( {images, setImages, prevImage, imageIndex}:IImageItemProps ) => {
  const [imageName, setImageName] = useState( '');
  const [previewImageUrl, setPreviewImageUrl] = useState<(string)>(prevImage);
  const fileRef = useRef<HTMLInputElement>(null);
  
  // 기존 이미지 호출 및 저장
  useEffect(() => {
    if (prevImage === "notImage") {
      setPreviewImageUrl('');
    }
    if (prevImage !== "notImage") {
      // 기본 이미지 저장
      const copyImages = [...images];
      copyImages[imageIndex] = prevImage;
      // 미리보기 이미지 호출
      setPreviewImageUrl(prevImage);
      // 기본 이미지 state에 저장
      setImages(copyImages);
    }
  }, [prevImage]);

  // 이미지 선택
  const onChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일
    const file = event.target.files?.[0];
    if (!file) return;

    // 미리보기용 이미지 초기화
    setPreviewImageUrl('');

    // 파일 검증
    const isValid = fileValidator(file);
    if(!isValid) return;

    // 미리보기용 URL 생성
    const filePreviews = URL.createObjectURL(file);
    // 미리보기용 URL state에 저장
    setPreviewImageUrl(filePreviews);

    // 부모 컴포넌트에 해당 파일 저장
    // 기존 prevImage를 교체함
    const copyImages = [...images];
    copyImages[imageIndex] = file ? file : "notImage";
    console.log(copyImages);
    setImages(copyImages);
    setImageName(file.name);
  }

  // 선택한 이미지 삭제
  const onClickImageDelete = (event: MouseEvent<HTMLImageElement>) => {
    // 클릭 이벤트 전파 방지
    event.stopPropagation();

    // 미리보기용 이미지 초기화
    setPreviewImageUrl('');

    // 이전 이미지 삭제
    // 부모 컴포넌트에서 해당 파일 삭제(null 처리)
    const copyImages = [...images];
    copyImages[imageIndex] = "notImage";
    setImages(copyImages);
  }

  const onClickImageButton = () => {
    if(!fileRef.current) return;
    fileRef.current.click();
  }

  return {
    onClickImageButton,
    onChangeImages,
    onClickImageDelete,
    previewImageUrl,
    fileRef,
    imageName
  }
}