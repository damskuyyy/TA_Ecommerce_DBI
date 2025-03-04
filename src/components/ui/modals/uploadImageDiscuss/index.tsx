import React, {
  useState,
  useCallback,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../../button";
import { Image } from "lucide-react";

const UploadImageDiscuss = ({
  isOpen,
  onClose,
  image,
  setImage,
  handleUploadImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  image: File[];
  setImage: Dispatch<SetStateAction<File[]>>;
  handleUploadImage: () => void;
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      // Validasi tipe file
      if (!acceptedFiles[0].type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      setImage(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Upload Payment Proof
        </h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 rounded-lg mb-4 text-center cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <Image />
            </div>
            {image.length > 0 ? (
              <p className="text-gray-500">{image[0].name}</p>
            ) : (
              <>
                <p className="text-gray-500 mb-1">Attach File</p>
                <p className="text-gray-400">or Drag & Drop</p>
              </>
            )}
          </div>
        </div>
        <Button
          onClick={() => {
            handleUploadImage();
            console.log("click");
          }}
          className="w-full"
        >
          Submit
        </Button>
        <Button onClick={onClose} className="w-full mt-2" variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UploadImageDiscuss;
