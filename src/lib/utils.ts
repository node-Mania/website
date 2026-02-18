import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function convertStringIntoList(description: string): Array<any> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(description, "text/html");
  return Array.from(doc.querySelectorAll("li")).map(
    (li) => li.innerHTML
  );
}
