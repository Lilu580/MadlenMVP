import { atomWithStorage } from "jotai/utils";
import { IProductSelect } from "@/lib/types";

export const productBasket = atomWithStorage<IProductSelect[]>("basket", []);
