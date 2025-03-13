import { Dispatch, SetStateAction } from "react";

export type IImageItemProps = {
  images: (File | undefined)[],
  setImages: Dispatch<SetStateAction<(File | undefined)[]>>,
  imageIndex: number
};
