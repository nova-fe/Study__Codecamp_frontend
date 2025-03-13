import { useRef, ChangeEvent, useState, MouseEvent } from 'react';
import { IImageItemProps } from './type';
import { fileValidator } from '@/commons/libraries/fileValidator';

export const useImageItem = ( {images, setImages, imageIndex}:IImageItemProps ) => {
  const [imageName, setImageName] = useState( '');
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

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
    copyImages[imageIndex] = file;
    setImages(copyImages);
    setImageName(file.name);

    console.log(copyImages);
  }

  // 선택한 이미지 삭제
  const onClickImageDelete = (event: MouseEvent<HTMLImageElement>) => {
    // 클릭 이벤트 전파 방지
    event.stopPropagation();

    // 미리보기용 이미지 초기화
    setPreviewImageUrl('');

    // 부모 컴포넌트에서 해당 파일 삭제(undefined 처리)
    const copyImages = [...images];
    copyImages[imageIndex] = undefined;
    setImages(copyImages);

    console.log(copyImages);
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