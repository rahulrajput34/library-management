import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { string } from "zod/v4";
import config from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

export const getFirstName = (name: string): string =>
  name.trim().split(/\s+/)[0] || "";

const ENDPOINT = config.env.imagekit.urlEndpoint;
export function ikUrl(path: string) {
  return ENDPOINT.replace(/\/$/, "") + "/" + path.replace(/^\//, "");
}
