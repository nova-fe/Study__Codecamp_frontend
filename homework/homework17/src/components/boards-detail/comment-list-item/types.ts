export type ICommentListItemProps = {
  comment: {
    commentId: string;
    writer: string;
    password: string;
    contents: string;
    rating: number;
    createdAt: string;
  };

  formatDate: (dateStr: string) => string;
};
