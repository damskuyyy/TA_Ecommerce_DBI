export interface ProductDataType {
  code_product?: string;
  name: string;
  desc: string;
  price: number;
  image: string[];
  category: string;
  variants: string[];
  details?: string;
  spec?: string;
  information?: string;
  sold?: number;
  rate?: number;
  reviews?: any[];
  discusses?: any[];
  stock?: number;
  minOrder?: number;
}
