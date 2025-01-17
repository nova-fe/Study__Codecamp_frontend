// 공통 데이터 타입
export interface IBoardsData {
  writer?: string;
  title?: string;
  contents?: string;
}

// 컴포넌트 게시판 작성의 index.tsx 에서 사용
export interface IBoardsWriteProps {
  isEdit?: boolean;
  data?: IBoardsData;
}
