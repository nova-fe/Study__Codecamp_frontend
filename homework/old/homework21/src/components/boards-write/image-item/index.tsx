import Image from "next/image";
import { useImageItem } from "./hook";
import { IImageItemProps } from "./type";

export default function ImageItem( {images, prevImage, setImages, imageIndex}: IImageItemProps) {
  const { onClickImageButton, fileRef, onChangeImages, previewImageUrl, onClickImageDelete } = useImageItem( {images, prevImage, setImages, imageIndex} );

  return (
    <>
      <button 
        onClick={onClickImageButton} 
        className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat tracking-tighter text-gray-600 relative">
        <input 
          type="file" 
          onChange={onChangeImages} 
          className="hidden" 
          ref={fileRef}
          accept="image/jpeg,image/png"   // 1. jpg/jpeg 모두 가능, 2. 띄어쓰기 없이 ',' 로 구분하기
        />
        {
          previewImageUrl ? (
          // previewImageUrl 이 있으면 실행, 근데 prevImage가 notImage는 아니여야함
            <span>
              <img
                src={previewImageUrl !== "notImage" ? previewImageUrl : ''}
                className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full h-auto object-contain max-h-full max-x-full" 
                alt="" 
                width={0}
                height={0}
                sizes="100vw"
              />
              <Image 
                src="/images/close-btn.png"
                className="w-6 h-6 absolute top-3 right-3"
                alt="이미지 삭제"
                width={0}
                height={0}
                sizes="100vw"
                onClick={onClickImageDelete}
              />
            </span>
          ) : (
            <span className="flex items-center flex-col gap-4">
              <Image
                src="/images/plus.png"
                className="w-[22px] h-[22px]"
                alt="plus"
                width={0}
                height={0}
                sizes="100vw"
              />
              클릭해서 사진 업로드
            </span>
          )
        }
        </button> 
    </>
  )
};
