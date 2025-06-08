"use client";

import Image from "next/image";
import { Upload } from "lucide-react";

interface EventImageUploadProps {
  previewImage: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function EventImageUpload({
  previewImage,
  onImageChange,
}: EventImageUploadProps) {
  return (
    <div className="space-y-4">
      <label className="text-white font-medium flex items-center">
        <Upload className="h-5 w-5 mr-2 text-cyan-400" />
        Imagen del evento
      </label>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white hover:file:bg-cyan-700 file:cursor-pointer cursor-pointer bg-[#1A2836] border border-gray-700 rounded-lg p-3"
          />
        </div>
        {previewImage && (
          <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden">
            <Image
              src={previewImage}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
