import { clsx, type ClassValue } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createReadonlyURLSearchParams(params: Record<string, string | number | undefined>): ReadonlyURLSearchParams {
  const searchParams = new URLSearchParams();

  // Add only valid parameters to the searchParams
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  // Convert to ReadonlyURLSearchParams
  return searchParams as ReadonlyURLSearchParams;
}