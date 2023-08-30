import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkFileType = (file: File, supportedTypes: string[]) => {
  if (file?.name) {
    const fileType = file.name.split(".").pop() as string;
    return supportedTypes.includes(fileType);
  }
  return false;
}
