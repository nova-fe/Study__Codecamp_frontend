'use client';

import { db } from "./firestore";
import { 
  collection,        // Firestore 컬렉션 참조
  getDocs           // Firestore에서 문서 가져오기
} from "firebase/firestore"; 

/**
 * 게시글 가져오기
 */
export const fetchPosts = async () => {
  // Firestore에서 "class-practice" 컬렉션의 모든 문서 가져오기
  const querySnapshot = await getDocs(collection(db, "class-practice"));

  // 각 문서를 객체 형태로 변환하여 배열로 반환
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
};

/**
 * Firestore에서 특정 페이지 데이터 가져오기
 * @param {number} currentPage - 요청한 페이지 번호
 * @param {Array} firstDocsPerPage - 각 페이지의 첫 문서 목록 
 */
// export const fetchBoardPage = async (currentPage, firstDocsPerPage) => {
//   const classPracticeCollectionRef  = collection(db, "class-practice");
//   let pageQuery; // Firestore 쿼리 변수 (페이지네이션 설정)

//   if (currentPage === 1 || firstDocsPerPage.length < currentPage - 1) {
//     // ✅ 첫 페이지이거나, 저장된 페이지 문서가 없을 경우
//     pageQuery = query(
//       classPracticeCollectionRef ,   // "class-practice" 컬렉션 참조
//       orderBy("createdAt", "desc"),  // "createdAt" 기준으로 내림차순 정렬
//       limit(10) // 한번에 10개씩 가져오기
//     )
//   } else {
//     // ✅ 특정 페이지 데이터 요청 (startAt 사용)
//     pageQuery = query(
//       classPracticeCollectionRef,
//       orderBy("createdAt", "desc"),  // "createdAt" 기준으로 내림차순 정렬
//       startAt(firstDocsPerPage[currentPage - 2]), // 이전 페이지의 첫 번째 문서 기준으로 가져오기
//       limit(10)
//     )
//   }

//   // Firestore에서 문서 가져오기
//   const querySnapshot = await getDocs(pageQuery); 

//   // 가져온 문서 데이터를 배열로 변환
//   const boardPosts = querySnapshot.docs.map((doc) => ({
//     id: doc.id,         // 문서 ID
//     ...doc.data()       // Firestore 데이터 (게시글 내용)
//   }));

//   // 페이지네이션을 위한 첫 번째 문서 저장
//   if (boardPosts.length > 0 && firstDocsPerPage.length < currentPage) {
//     firstDocsPerPage[currentPage - 1] = querySnapshot.docs[0];
//   }

//   return { boardPosts, firstDocsPerPage };
// }