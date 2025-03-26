// 이미지 파일 용량/확장자 검증
export const fileValidator = (file: File) => {
  // 파일이 없으면 false
  if (!file) return false;

  // 용량 검증
  // if(file.size > 5 * 1024 * 1024) {
  //   alert("파일 용량이 너무 큽니다. (제한: 5MB)");
  if(file.size > 200 * 1024) {
    alert("파일 용량이 너무 큽니다. (제한: 200KB)");
    return false;
  }
  // 파일 확장자 검증
  if(!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("jpeg 또는 png 파일만 업로드 가능합니다.");
    return false;
  }

  return true;
}