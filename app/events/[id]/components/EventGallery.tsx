import Image from "next/image";
import { useState } from "react";
import { memo } from "react";

type EventGalleryProps = {
  mainImage: string;
  gallery?: string[];
  eventName: string;
};

const EventGallery = memo(
  ({ mainImage, gallery = [], eventName }: EventGalleryProps) => {
    const [activeImage, setActiveImage] = useState(mainImage);

    return (
      <div>
        <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden mb-4">
          <Image
            src={activeImage}
            alt={eventName}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex gap-2 overflow-x-auto p-2">
          <div
            className={`w-20 h-20 relative rounded-lg overflow-hidden cursor-pointer ${
              activeImage === mainImage ? "ring-2 ring-cyan-400" : ""
            }`}
            onClick={() => setActiveImage(mainImage)}
          >
            <Image
              src={mainImage}
              alt="Thumbnail"
              fill
              className="object-cover"
            />
          </div>

          {gallery?.map((img: string, index: number) => (
            <div
              key={index}
              className={`w-20 h-20 relative rounded-lg overflow-hidden cursor-pointer ${
                activeImage === img ? "ring-2 ring-cyan-400" : ""
              }`}
              onClick={() => setActiveImage(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

EventGallery.displayName = "EventGallery";

export default EventGallery;
