import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { IProductSelect } from "@/lib/types";
import { ApiOrder } from "@/lib/api";

export const productCart = atomWithStorage<IProductSelect[]>("cart", []);

export const lastOrderAtom = atom<ApiOrder | null>(null);
