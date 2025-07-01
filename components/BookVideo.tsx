"use client";
import React from "react";
import { IKVideo, ImageKitProvider } from "imagekitio-next";
import config from "@/lib/config";

// display the video
const BookVideo = ({ videoUrl }: { videoUrl: string }) => {
  return (
    // wrap it into the ImageKitProvider to use the ImageKit API and display the video
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
    >
      <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl" />
    </ImageKitProvider>
  );
};
export default BookVideo;
