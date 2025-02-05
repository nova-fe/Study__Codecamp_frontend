export type ICommentListItemProps = {
  comment: {
    id: string;
    writer: string;
    password: string;
    contents: string;
    rating: number;
    createdAt: string;
  };

  formatDate: (dateStr: string) => string;
};
