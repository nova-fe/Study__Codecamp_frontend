"use client"

import { addPosts } from "@/api/firestore/boards";
import { storage } from "@/api/firestore/firestore";
import { checkValidationFiles } from "@/commons/libraries/18-03-validation-file";
// import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent, useRef, useState } from "react";

export default function ImageUploadPage() {
  const [writer, setWriter] = useState("");  
  const [password, setPassword] = useState("");  
  const [title, setTitle] = useState("");  
  const [contents, setContents] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);   // 선택 이미지
  // 미리보기용 이미지
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]); 
  
  const fileRef = useRef<HTMLInputElement>(null);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  }
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  }

  
  // 이미지 파일을 선택 할 때마다 실행
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;  // 배열로 들어오는 이유: <input type="file" multiple /> 일 때, 파일을 여러개 선택 가능
    if (!files) return;

    // 선택 이미지 초기화
    setSelectedImages([]);
    // 미리보기용 이미지 초기화
    setPreviewImageUrls([]);

    // 선택한 파일들을 배열로 변환
    const fileArray: File[] = Array.from(files);
    
    // 파일 검증
    const isValid = checkValidationFiles(fileArray);
    if(isValid) return; // 검증에 통과하지 못했다면 함수 종료

    setSelectedImages(fileArray); // 선택 파일들 state에 저장

    // 미리보기용 임시 URL들을 모아놓은 배열 생성
    // => URL.createObjectURL() : 브라우저 메모리 내에 임시로 파일의 URL 생성
    const filePreviews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImageUrls(filePreviews);
  }

  const onClickImageInput = () => {
    // document.getElementById("파일태그ID")?.click();
    if(!fileRef.current) return;
    fileRef.current.click(); // fileRef로 참조된 태그를 클릭함
  }

  // 이미지 업로드 및 URL 저장
  const imageUpload = async () => {
    if (selectedImages.length === 0) return; // 이미지가 없다면 함수 종료
    
    try {
      const imageUrls: string[] = []; // 이미지 리스트(배열)

      // 선택한 이미지 갯수만큼 반복
      for (const image of selectedImages) {
        // Firebase Storage 에 저장할 경로 설정
        const imageRef = ref(storage, `images/dummy/${image.name}`);

        // Storage에 파일 업로드
        await uploadBytes(imageRef, image);

        // 업로드가 완료된 후, 다운로드 가능한 URL 가져오기
        const downloadUrl = await getDownloadURL(imageRef);

        // 이미지 리스트에 Url들 저장
        imageUrls.push(downloadUrl);
      }

      console.log("이미지 업로드 성공!", imageUrls);
      // 파일 업로드가 완료된 이미지 Url들이 담긴 배열 리턴
      return imageUrls;
    } catch (error) {
      console.error('이미지 업로드 실패', error);
      // 없다면 빈 배열 반환
      return [];
    }
  }


  // 게시글 등록
  const onClickSubmit = async () => {
    try {
      // 이미지 업로드 후 URL 받아오기
      const uploadedImageUrls = await imageUpload();

      // 등록할 데이터
      const newData = {
        writer,
        password,
        title,
        contents,
        images: uploadedImageUrls
      }

      // 게시글 등록
      await addPosts(newData);
    } catch (error) {
      console.error("게시글 등록 실패", error);
    }
    
  }


  return (
    <>
      작성자: <input type="text" onChange={onChangeWriter} /> <br/>
      비밀번호: <input type="password" onChange={onChangePassword} /> <br/>
      제목: <input type="text" onChange={onChangeTitle} /> <br/>
      내용: <input type="text" onChange={onChangeContents} /> <br/>

      <div className="w-24 h-24 bg-gray-400" onClick={onClickImageInput}>이미지 선택</div>
      <input 
        type="file" 
        onChange={onChangeFile} 
        className="hidden" 
        ref={fileRef} 
        accept="image/jpeg,image/png"   // 1. jpg/jpeg 모두 가능, 2. 띄어쓰기 없이 ',' 로 구분하기
        multiple
      />

      <div>* 등록 이미지 미리보기 *</div>
      {
        previewImageUrls.map((url, index) => (
          <img key={index} src={url} className="w-20 h-20" />
        ))
      }

      {/* <button onClick={onClickUpload}>이미지 업로드</button> */}
      <button onClick={onClickSubmit}>게시글 등록 요청하기</button>
    </>
  )
};
