import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
  keyList: string[];
  currentPage?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limitPage: number;
}