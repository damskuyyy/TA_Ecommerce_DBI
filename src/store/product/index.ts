import { ProductDataType } from "@/types/productDataTypes";
import { create } from "zustand";

interface ProductState {
  selectedProduct: ProductDataType | null;
  updateProduct: (product: ProductDataType) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  selectedProduct: null,
  updateProduct: (product) => set({ selectedProduct: product }),
}));
