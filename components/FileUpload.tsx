"use client";

import { ImageKitProvider, Image, Video, upload } from "@imagekit/next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// image kit without repetition ..(we can also give it simply)
const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    // call the backend at url which is inside the app\api\auth\imagekit\route.ts path
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    // if the response is not OK
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Returns { signature, expire, token } needed by ImageKit’s secure upload API
    const { signature, expire, token } = await response.json();
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

// props for the component
interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

// FileUpload component
const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  // ref to the input element for the file input
  const ikUploadRef = useRef<HTMLInputElement | null>(null);

  //holds the uploaded file’s URL
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });

  // 0–100, shows upload progress.
  const [progress, setProgress] = useState(0);

  const styles = {
    button: cn(
      "relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition",
      variant === "dark"
        ? "bg-dark-300 text-light-100 hover:ring-2 hover:ring-dark-100"
        : "bg-light-600 text-dark-400 border border-gray-200 hover:ring-2 hover:ring-light-400"
    ),
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-200" : "text-dark-400",
  };

  const handleUpload = async (fileObj: File) => {
    try {
      // Get signature via authenticator
      const { signature, expire, token } = await authenticator();

      // Call ImageKit’s upload
      const res = await upload({
        file: fileObj,
        fileName: fileObj.name,
        publicKey,
        signature,
        expire,
        token,
        folder,
        useUniqueFileName: true,
        onProgress: ({ loaded, total }) =>
          // updates your `progress` state
          setProgress(Math.round((loaded / total) * 100)),
      });

      setFile({ filePath: res.url });
      onFileChange(res.url);

      toast.success(`${type} uploaded successfully`);
    } catch (error) {
      console.error(error);
      toast.error(`Your ${type} could not be uploaded. Please try again.`);
    } finally {
      //  reset progress to 0 after a short delay
      setTimeout(() => setProgress(0), 500);
    }
  };

  // validation of memory usage
  const onValidate = (fileObj: File) => {
    const tooLarge =
      (type === "image" && fileObj.size > 20 * 1024 * 1024) ||
      (type === "video" && fileObj.size > 50 * 1024 * 1024);

    if (tooLarge) {
      toast.error(
        `Please upload a ${type} < ${
          type === "image" ? "20" : "50"
        } MB in size.`
      );
      return false;
    }
    return true;
  };

  return (
    // ImageKitProvider is a wrapper that provides the ImageKit API key and URL endpoint to the Image component
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint}>
      {/* hidden native input to select the file*/}
      <input
        ref={ikUploadRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={async (e) => {
          const fileObj = e.target.files?.[0];
          if (fileObj && onValidate(fileObj)) await handleUpload(fileObj);
        }}
      />

      {/* Styled button that triggers the input */}
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          ikUploadRef.current?.click();
        }}
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <span className={styles.placeholder}>{placeholder}</span>
        {file.filePath && (
          <span
            className={cn(
              "max-w-[12rem] truncate text-xs font-normal",
              styles.text
            )}
          >
            {file.filePath}
          </span>
        )}
      </button>

      {/* progress bar */}
      {progress > 0 && progress < 100 && (
        <div className="mt-2 h-2 w-full overflow-hidden rounded bg-gray-200">
          <div
            className="h-full rounded bg-emerald-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* preview */}
      {file.filePath && (
        <div className="mt-4 w-full">
          {type === "image" ? (
            <Image
              alt="uploaded preview"
              src={file.filePath}
              width={1024}
              height={576}
              className="w-full rounded-xl object-cover"
            />
          ) : (
            <Video
              src={file.filePath}
              controls
              className="h-64 w-full rounded-xl object-cover"
            />
          )}
        </div>
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
