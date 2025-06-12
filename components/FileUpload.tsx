"use client";

import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import ImageKit from "imagekit";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({
    filePath: value ?? null,
  });
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg"
        : "bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg shadow",
    placeholder: "text-gray-500",
    text: "text-gray-700",
  };

  const onError = (error: any) => {
    console.log(error);
    toast(`${type} upload failed`, {
      description: `Your ${type} could not be uploaded. Please try again.`,
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast(`${type} uploaded successfully`, {
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "image") {
      if (file.size > 20 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 20 MB in size",
        });
        return false;
      }
    } else if (type === "video") {
      if (file.size > 50 * 1024 * 1024) {
        toast("File size too large", {
          description: "Please upload a file that is less than 50 MB in size",
        });
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <div className="flex flex-col items-center p-6 space-y-4 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-50">
        <IKUpload
          ref={ikUploadRef}
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          validateFile={onValidate}
          onUploadStart={() => setProgress(0)}
          onUploadProgress={({ loaded, total }) =>
            setProgress(Math.round((loaded / total) * 100))
          }
          folder={folder}
          accept={accept}
          className="hidden"
        />

        <button
          className={cn("flex items-center space-x-2", styles.button)}
          onClick={(e) => {
            e.preventDefault();
            if (ikUploadRef.current) {
              // @ts-ignore
              ikUploadRef.current.click();
            }
          }}
        >
          <Image
            src="/icons/upload.svg"
            alt="upload-icon"
            width={20}
            height={20}
            className="object-contain"
          />
          <p className={cn("font-medium", styles.placeholder)}>{placeholder}</p>
        </button>

        {file.filePath && (
          <p className="text-sm text-gray-700 break-all">{file.filePath}</p>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {file.filePath && type === "image" && (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
            className="mt-4 rounded-lg shadow-lg"
          />
        )}

        {file.filePath && type === "video" && (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="mt-4 w-full rounded-lg shadow-lg"
          />
        )}
      </div>
    </ImageKitProvider>
  );
};

export default FileUpload;