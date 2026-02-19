import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function convertStringIntoList(description: string): Array<string> {
  const matches = description.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
  if (!matches) return [];

  return matches.map((item) => item.replace(/<\/?li[^>]*>/g, ""));
}
