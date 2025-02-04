export interface ICreateBoardRequst {
  writer: string;
  password: string;
  title: string;
  contents: string;
  createdAt?: string;
}

export interface IUpdateBoardRequst {
  title: string;
  contents: string;
  writer: string;
  password: string;
  youtubeUrl?: string;
  address?:
  | {
      zipcode?: string | undefined;
      address?: string | undefined;
      addressDetail?: string | undefined;
    }
  | undefined;
}
