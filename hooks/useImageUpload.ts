import { useState } from "react";

export const useImageUpload = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setPreviewImage(null);
    setImageFile(null);
  };

  return {
    previewImage,
    imageFile,
    handleImageChange,
    resetImage,
  };
};
