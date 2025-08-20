import { atomWithStorage } from "jotai/utils";
import { IProductSelect } from "@/lib/types";

export const productCart = atomWithStorage<IProductSelect[]>("cart", []);
