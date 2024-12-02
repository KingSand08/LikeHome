"use client";

import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/rows.css";
import Image from "next/image"; // Import from next/image

import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";

const PaginatedRoomImageGrid: React.FC<{ hotelDetails: APIHotelDetailsJSONFormatted }> = ({
  hotelDetails,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photos, setPhotos] = useState<
    { src: string; width: number; height: number; alt: string; title: string }[]
  >([]);

  const MAX_IMAGES = 5;

  useEffect(() => {
    if (!hotelDetails?.images) return;

    const fetchImageDimensions = async () => {
      const updatedPhotos = hotelDetails.images.map((image) => ({
        src: image.url,
        width: image.width || 800, // Fallback width
        height: image.height || 600, // Fallback height
        alt: image.alt || image.description || "Image",
        title: image.description || "Image",
      }));

      setPhotos(updatedPhotos);
    };

    fetchImageDimensions();
  }, [hotelDetails]);

  const limitedPhotos = photos.slice(0, MAX_IMAGES);

  return (
    <div className="flex flex-col items-center">
      {/* Carousel */}
      <div className="carousel carousel-center bg-slate-300 dark:bg-neutral rounded-box w-full space-x-4 p-4 mb-5">
        {limitedPhotos.map((photo, index) => (
          <div className="carousel-item" key={index}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={400}
              height={400}
              quality={100}
              priority={index === 0} // Preload the first image
              className="rounded-box cursor-pointer w-full h-96 object-cover"
              onClick={() => setLightboxIndex(index)}
            />
          </div>
        ))}

        {/* View All Button */}
        {photos.length > MAX_IMAGES && (
          <div className="carousel-item flex justify-center items-center">
            <button
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              View All
            </button>
          </div>
        )}
      </div>

      {/* DaisyUI Modal for Photo Album */}
      <dialog id="photo_album_modal" className={`modal ${isModalOpen ? "modal-open" : ""}`}>
        <div className="modal-box w-full max-w-5xl p-8">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          {/* Photo Album */}
          <PhotoAlbum
            photos={photos}
            layout="rows"
            targetRowHeight={150}
            spacing={10}
            onClick={({ index }) => {
              setLightboxIndex(index);
              setIsModalOpen(false); // Close modal when Lightbox opens
            }}
          />
        </div>
      </dialog>

      {/* Lightbox */}
      <Lightbox
        slides={photos}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        plugins={[Fullscreen, Thumbnails, Captions, Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          scrollToZoom: true,
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "start",
        }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          captionsTitle: {
            position: "absolute",
            top: "10px",
            left: "20px",
            right: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            zIndex: 10,
          },
          captionsDescription: {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default PaginatedRoomImageGrid;
