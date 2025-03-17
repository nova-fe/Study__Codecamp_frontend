// 이미지 있는 게시글 수정: http://localhost:3000/boards/-OLDX5n_McwGWu5j_9G7/edit
// 이미지: https://firebasestorage.googleapis.com/v0/b/nova-codecamp-board.firebasestorage.app/o/images%2Fhomework%2Frow_image2.jpg?alt=media&token=219ae39e-a69b-47e0-80e0-88bfb2c81a8f

import { useRef, ChangeEvent, useState, MouseEvent, useEffect } from 'react';
import { IImageItemProps } from './type';
import { fileValidator } from '@/commons/libraries/fileValidator';

export const useImageItem = ( {images, setImages, prevImage, imageIndex}:IImageItemProps ) => {
  const [imageName, setImageName] = useState( '');
  const [previewImageUrl, setPreviewImageUrl] = useState<(string)>('');
  const fileRef = useRef<HTMLInputElement>(null);
  
  // prevImage로 기본 이미지 설정 (작은 이미지 미리보기용)
  useEffect(() => {
    // prevImage[imageIndex]가 "notImage"가 아니면 setPreviewImageUrl(미리보기 Url)에 해당 값 저장
    if (prevImage[imageIndex] !== "notImage") {
      setPreviewImageUrl(prevImage[imageIndex]);
    }
    setImages(prevImage);
  }, [prevImage[imageIndex]]);

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
    const copyImages = [...images];
    if (file) copyImages[imageIndex] = file  // 선택한 파일이 있다면 해당 파일을 저장
    setImages(copyImages);
    setImageName(file.name);
  }

  // 선택한 이미지 삭제
  const onClickImageDelete = (event: MouseEvent<HTMLImageElement>) => {
    // 클릭 이벤트 전파 방지
    event.stopPropagation();
    // 미리보기용 이미지 초기화
    setPreviewImageUrl('');
    
    const copyImages = [...images];
    // 해당 imageIndex의 값을 notImage로 설정
    copyImages[imageIndex] = "notImage";
    // 업데이트된 이미지 배열을 state에 저장
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