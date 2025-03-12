"use client"

import { db, storage } from "@/api/firestore/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

export default function ImageUploadPage() {
  const [image, setImage] = useState(null); // 이미지 파일 상태
  const [imageList, setImageList] = useState([]); // Firestore 에서 가져온 이미지
  
  // 이미지 파일을 선택 할 때마다 실행
  const onChangeFile = (event) => {
      const file = event.target.files[0];  // 배열로 들어오는 이유: <input type="file" multiple /> 일 때, 파일을 여러개 선택 가능
      if (file) {
        setImage(file);
      }
  }

  // 이미지 업로드 및 Firestore 에 URL 저장
  const onClickUpload = async () => {
    if (!image) return; // 이미지가 없다면 함수 종료

    // Firebase Storage 에 저장할 경로 설정
    const imageRef = ref(storage, `images/dummy/${image.name}`);

    try {
      // Storage에 파일 업로드
      await uploadBytes(imageRef, image);

      // 업로드가 완료된 후, 다운로드 가능한 URL 가져오기
      const downloadUrl = await getDownloadURL(imageRef);

      // Firestore 에 이미지 URL 저장
      const docRef = await addDoc(collection(db, "images"), {
        imageUrl: downloadUrl,  // Firestore에 이미지 URL 저장
      });

      console.log("이미지 업로드 성공! Firestore에 URL 저장됨", docRef.id);
    } catch (error) {
      console.error('이미지 업로드 실패', error);
    }
  }

  // 이미지 불러오기
  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      const imageData = querySnapshot.docs.map(doc => doc.data());
      setImageList(imageData);
    }

    fetchImages();
  }, []);

  return (
    <>
      <input type="file" onChange={onChangeFile}/>
      <button onClick={onClickUpload}>이미지 업로드</button>

      {/* 이미지 불러오기 */}
      {
        imageList.map((image, index) => (
          <div key={index}>
            <img src={image.imageUrl} />
          </div>
        ))
      }
    </>
  )
};
