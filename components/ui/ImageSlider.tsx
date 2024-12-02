"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type ImageSliderProps = {
    images: {
        url: string;
        description: string;
    }[];
};

export function ImageSlider({ images }: ImageSliderProps) {
    const [imageIndex, setImageIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    function showNextImage() {
        setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }

    function showPrevImage() {
        setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    }

    return (
        <div className="relative w-full h-64 overflow-hidden rounded-lg bg-slate-300 bg-opacity-70 dark:bg-slate-700 dark:bg-opacity-100">
            {/* Image */}
            <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
                {images.map(({ url, description }, index) => (
                    <div
                        key={url}
                        className="flex-shrink-0 w-full h-full flex items-center justify-center py-4"
                        onClick={() => setLightboxIndex(index)} // Opens the Lightbox on click
                    >
                        <Image
                            src={url}
                            width={400}
                            height={400}
                            quality={100}
                            alt={description}
                            className="w-auto h-52 max-w-full max-h-full m-auto cursor-pointer"
                        />
                    </div>
                ))}
            </div>

            {/* Previous Button */}
            <button
                onClick={showPrevImage}
                className="btn btn-circle absolute left-2 top-[40%] shadow-md"
                aria-label="View Previous Image"
            >
                ❮
            </button>

            {/* Next Button */}
            <button
                onClick={showNextImage}
                className="btn btn-circle absolute right-2 top-[40%] shadow-md"
                aria-label="View Next Image"
            >
                ❯
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setImageIndex(index)}
                        aria-label={`View Image ${index + 1}`}
                        className={`w-3 h-3 rounded-full ${imageIndex === index ? "bg-primary dark:bg-secondary" : "bg-gray-400 dark:bg-gray-500"
                            }`}
                    />
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                slides={images.map(({ url, description }) => ({
                    src: url,
                    alt: description,
                }))}
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                plugins={[Fullscreen, Zoom]}
                zoom={{
                    maxZoomPixelRatio: 3,
                    zoomInMultiplier: 1.2,
                    doubleTapDelay: 300,
                    doubleClickDelay: 300,
                    scrollToZoom: true,
                }}
            />
        </div>
    );
}
