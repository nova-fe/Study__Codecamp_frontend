import { Dispatch, SetStateAction } from "react";
import { FetchBoardsKeyResponse, FetchBoardsResponse } from "../../../schemas";

export interface ISearchProps {
  setFilteredKeyList: Dispatch<SetStateAction<FetchBoardsKeyResponse>>,
  keyList: string[],
  allPostsData: FetchBoardsResponse,
  searchKeyword: string,
  setSearchKeyword: Dispatch<SetStateAction<string>>,
}
