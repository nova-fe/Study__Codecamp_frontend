'use client';

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { ISearchProps } from "./type";
import { useSearch } from "./hook";

export default function Search( {setFilteredKeyList, keyList, allPostsData, searchKeyword, setSearchKeyword}: ISearchProps ) {
  const {onChangeSearch, onClickSearch} = useSearch({setFilteredKeyList, keyList, allPostsData, searchKeyword, setSearchKeyword})

  return (
    <div className="flex items-center">
      {/* 검색바 */}
      <div className="w-[49rem] bg-gray-100 mr-4 rounded-lg flex items-center p-4">
        <Image
          className="h-auto w-[1.125rem] mr-3"
          src="/images/search.png"
          alt="검색"
          width={0}
          height={0}
          sizes="100vw"
          />
        <input className="w-full bg-transparent focus-visible:outline-none" type="text" onChange={onChangeSearch} placeholder="제목을 검색해 주세요."/>
      </div>
      <button className="btn-black btn-md" onClick={onClickSearch}>검색</button>
    </div>
  );
}
