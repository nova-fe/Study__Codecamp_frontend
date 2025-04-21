// 공통 데이터 타입
export interface IBoardsWriteProps {
  isEdit?: boolean;
}

export interface IBoardIdParams {
  [key: string]: string;
}

export interface IUpdateBoardRequst {
  title: string;
  contents: string;
  writer: string;
  password: string;
  youtubeUrl?: string;
  address?: {
      zipcode?: string | undefined;
      address?: string | undefined;
      addressDetail?: string | undefined;
    }
  | undefined;
  images?: (string)[];
}
