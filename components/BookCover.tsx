"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";
import BookCoverSvg from "./BookCoverSvg";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type Variant = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<Variant, string> = {
  xs: "w-20 h-28",
  sm: "w-24 h-32",
  md: "w-28 h-36",
  lg: "w-32 h-44",
  xl: "w-36 h-52",
};

interface Props {
  variant?: Variant;
  coverImage: string;
  coverColor?: string;
  className?: string;
}

const BookCover = ({
  variant = "lg",
  coverImage,
  coverColor = "#0d1d35",
  className,
}: Props) => (
  <div
    className={cn(
      "relative shrink-0 rounded-md shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]",
      SIZES[variant],
      className
    )}
    style={{ backgroundColor: coverColor }}
  >
    <BookCoverSvg coverColor={coverColor} />
    <div
      className="absolute z-10"
      style={{ left: "12%", width: "87.5%", height: "88%" }}
    >
      <IKImage
        path={coverImage}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        alt="Book cover"
        fill
        className="rounded-sm object-fill"
        loading="lazy"
        lqip={{ active: true }}
      />
    </div>
  </div>
);

export default BookCover;
