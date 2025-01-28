// 데이터 타입
export interface IBoardsListProps {
  data: {
    writer: string;
    title: string;
    password: string;
    contents: string;
    date: string;
    createdAt: number;
    youtubeUrl: string;
    id: string;
    address?:
      | {
          zipcode?: string | undefined;
          address?: string | undefined;
          addressDetail?: string | undefined;
        }
      | undefined;
  }[];
}
