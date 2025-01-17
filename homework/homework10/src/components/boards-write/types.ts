// 공통 데이터 타입
export interface IBoardsWriteData {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export interface IBoardsWriteProps {
  isEdit?: boolean;
}
