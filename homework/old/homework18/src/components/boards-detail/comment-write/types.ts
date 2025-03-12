import { Dispatch, SetStateAction } from 'react';

export type ICommentWriteProps = {
  isEdit?: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isUpdated?: boolean;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  commentData?: {
    commentId: string;
    writer: string;
    password: string;
    contents: string;
    rating: number;
    createdAt: string;
  };
  prevCommentData?: {
    writer: string;
    password: string;
    contents: string;
    rating: number;
    createdAt: string;
  };
  commentId: string;
  formatDate?: (dateStr: string) => string;
};
