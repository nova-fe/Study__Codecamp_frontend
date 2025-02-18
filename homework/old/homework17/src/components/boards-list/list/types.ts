export interface IBoardsListProps {
  data: {
    id: string;
    contents: string;
    writer: string;
    title: string;
    createdAt: string;
    password: string;
    date: string;
    youtubeUrl?: string;
    address?:
      | {
          zipcode?: string | undefined;
          address?: string | undefined;
          addressDetail?: string | undefined;
        }
      | undefined;
  }[];
  onClickDelete: (boardId: string) => void;
  currentPage: number;
  limitPage: number;
}
