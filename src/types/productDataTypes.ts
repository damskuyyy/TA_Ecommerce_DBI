import { ReactNode } from "react";
import { ReviewsDataTypes } from "./reviewDataTypes";
import { DiscussionDataType } from "./discussionDataTypes";

export interface ProductDataType {
  id: string,
  code_product?: string,
  name: string,
  desc: string,
  price: number,
  image: string[],
  category: string,
  variants: string[],
  details?: string,
  spec?: string,
  information?: string,
  sold?: number,
  rate?: number,
  reviews?: ReviewsDataTypes[],
  discusses?: DiscussionDataType[],
  stock?: number,
  minOrder?: number,
  // items
  variant?: string
  quantity?: number,
  notes?: string
}
