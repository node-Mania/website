import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CleanProduct } from "./types/whmcs.types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function convertStringIntoList(description: string): Array<string> {
  const matches = description.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
  if (!matches) return [];

  return matches.map((item) => item.replace(/<\/?li[^>]*>/g, ""));
}



export function resolveProductUrl(
  product: CleanProduct,
  selectedCurrencyId: number,
  billingMode: string = 'monthly' // monthly, annually, biennially, triennially
): string {
  if (!product || !product.productUrl || !selectedCurrencyId || !billingMode) {
    return '';
  }

  const url = new URL(product.productUrl);
  url.searchParams.set('currency', selectedCurrencyId.toString());
  url.searchParams.set('billingcycle', billingMode);

  console.log(url);
  return url.toString();
}

