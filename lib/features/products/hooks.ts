import { useSelector } from "react-redux";
import type { RootState } from "../../../lib/store";

export const useSelectedProduct = () =>
  useSelector((state: RootState) => state.products.selectedProduct);
