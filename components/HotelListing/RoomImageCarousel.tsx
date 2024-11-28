import React, { useState } from 'react'
import Image from "next/image";
import { APIHotelDetailsJSONFormatted } from '@/app/api/hotels/details/route';
import ImageModal from '../modal/ImageModal';

const RoomImageCarousel: React.FC<{ hotelDetails: APIHotelDetailsJSONFormatted }> = ({ hotelDetails }) => {
    const [selectedImage, setSelectedImage] = useState<{ image: string, alt: string } | null>(null);

    return (
        <>
            <div className="mb-12 select-none" >
                <h4 className="text-xl font-semibold mb-4">Room Images</h4>
                <div className="carousel w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-xl  shadow-lg">
                    {hotelDetails?.images
                        .filter((image) => image.description.toLowerCase().includes("room"))
                        .map((image, index, roomImages) => (
                            <div
                                id={`room-slide${index + 1}`}
                                key={index}
                                className="carousel-item relative w-full"
                            >
                                <div className="flex flex-col space-y-5 w-full">
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        width={1200}
                                        height={1200}
                                        quality={100}
                                        unoptimized
                                        onClick={() => setSelectedImage({ image: image.url, alt: image.alt })}
                                        className="w-full h-96 object-contain rounded-lg cursor-pointer bg-slate-900 bg-opacity-25 shadow-md"
                                    />
                                    <p className="text-center text-lg my-4 pb-4">{image.description}</p>
                                </div>
                                <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                    <a
                                        href={`#room-slide${index === 0 ? roomImages.length : index}`}
                                        className="btn btn-circle"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={`#room-slide${index + 2 > roomImages.length ? 1 : index + 2
                                            }`}
                                        className="btn btn-circle"
                                    >
                                        ❯
                                    </a>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Modal for Selected Image */}
            {selectedImage && (
                <ImageModal
                    image={selectedImage.image}
                    alt={selectedImage.alt}
                    onClose={() => setSelectedImage(null)}
                    className='w-fit dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800 bg-gradient-to-r from-slate-200 to-slate-300'
                />
            )}
        </>
    );
}

export default RoomImageCarousel