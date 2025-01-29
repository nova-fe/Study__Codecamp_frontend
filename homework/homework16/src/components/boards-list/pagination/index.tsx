"use client"

import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded } from '@mui/icons-material';

export default function PaginationComponents() {
  return (
    <div className="container mx-auto max-w-screen-xl">
      <p>============== 페이징 ==============</p>
      <KeyboardArrowLeftRounded className=" text-gray-400" />
      <div>
        {
          Array.from({ length: 10 }, (_, index) => (
            <button className='font-normal text-base text-gray-500'>{index + 1}</button>
          ))
        }
      </div>
      <KeyboardArrowRightRounded className=" text-gray-800" />
      <p>============== 페이징 ==============</p>
    </div>
  )
}