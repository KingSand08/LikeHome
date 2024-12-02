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

  const MAX_IMAGES = 6;

  useEffect(() => {
    if (!hotelDetails?.images) return;

    // Dynamically fetch image dimensions
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
      {/* Visible Images */}
      <div className="flex gap-2 w-full overflow-x-auto">
        {/* Display limited photos */}
        {limitedPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative w-1/6 h-48 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}

        {/* "View All" Button */}
        {photos.length > MAX_IMAGES - 1 && (
          <div
            className="relative w-1/6 h-48 rounded-lg overflow-hidden cursor-pointer bg-gray-800 flex items-center justify-center text-white"
            onClick={() => setIsModalOpen(true)} // Open modal
          >
            <img
              src={photos[MAX_IMAGES - 1].src}
              alt="View All"
              className="object-cover w-full h-full opacity-50"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-lg font-semibold">+{photos.length - (MAX_IMAGES - 1)} photos</span>
            </div>
          </div>
        )}
      </div>


      {/* Photo Album Modal */}
      <dialog
        id="photo_album_modal"
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
        onClick={(e) => {
          // Close modal if clicking outside the modal content
          const modalBox = document.querySelector(".modal-box");
          if (modalBox && !modalBox.contains(e.target as Node)) {
            setIsModalOpen(false);
          }
        }}
      >
        {/* Modal Overlay */}
        <div className="modal-overlay bg-black/50 fixed inset-0 z-10"></div>

        {/* Modal Content */}
        <div className="modal-box w-full max-w-5xl p-12 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded-lg shadow-2xl z-20 overflow-auto relative">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle absolute right-4 top-4 bg-red-600 hover:bg-red-800 border-0 text-white"
            onClick={() => setIsModalOpen(false)}
          >
            ✕
          </button>

          {/* Photo Album */}
          <PhotoAlbum
            photos={photos}
            layout="rows"
            targetRowHeight={200} // Ensure consistent row height
            spacing={10} // Add spacing between images
            onClick={({ index }) => setLightboxIndex(index)} // Open Lightbox on click
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