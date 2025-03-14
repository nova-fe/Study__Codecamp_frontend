import { Dispatch, SetStateAction } from "react";

export type IImageItemProps = {
  images: (File | string)[],
  prevImage: string,
  setImages: Dispatch<SetStateAction<(File | string)[]>>,
  imageIndex: number
};
