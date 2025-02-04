export interface ICommentItemProps {
  el: {
    id: string;
    writer: string;
    title: string;
    password: string;
    contents?: string;
    date?: string;
    createdAt?: number;
    youtubeUrl?: string;
    address?: {
      zipcode?: string;
      address?: string;
      addressDetail?: string;
    }
  }
  }
