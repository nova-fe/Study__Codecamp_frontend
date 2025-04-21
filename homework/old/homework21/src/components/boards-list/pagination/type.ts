import { Dispatch, SetStateAction } from "react";

export interface IPaginationProps {
  filteredKeyList: string[];
  currentPage?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  limitPage: number;
}