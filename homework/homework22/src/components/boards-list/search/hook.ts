'use client'

import { ChangeEvent, useState } from "react";
import { ISearchProps } from "./type";

export const useSearch = ({setFilteredKeyList, keyList, allPostsData, searchKeyword, setSearchKeyword}: ISearchProps) => {
  const [searchWord, setSearchWord] = useState<string>(searchKeyword);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }

  const onClickSearch = () => {
    if(!searchWord.trim()) {
      setFilteredKeyList(keyList);
      setSearchKeyword('');
      return;
    }

    const filteredKeys = keyList.filter((key) => {
      const title = allPostsData[key]?.title; // 모든 데이터에서 제목(title)을 가져옴
      const isMatch = title.toLowerCase().includes(searchWord.toLowerCase());
      return isMatch;
    });

    setFilteredKeyList(filteredKeys); // 필터링된 key 목록 업데이트
    setSearchKeyword(searchWord);
  };

  return {
    onChangeSearch,
    onClickSearch,
  }
}