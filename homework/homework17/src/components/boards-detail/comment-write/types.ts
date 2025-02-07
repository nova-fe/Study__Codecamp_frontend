import { Dispatch, SetStateAction } from 'react';

export type ICommentWriteProps = {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  comment: {
    commentId: string;
    writer: string;
    password: string;
    contents: string;
    rating: number;
    createdAt: string;
  };

  formatDate?: (dateStr: string) => string;
};
