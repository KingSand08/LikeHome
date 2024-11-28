"use client";
import React, { useState } from 'react'
import Image from "next/image";
import { APIHotelDetailsJSONFormatted } from '@/app/api/hotels/details/route'
import ImageModal from '../modal/ImageModal';

const PaginatedRoomImageGrid: React.FC<{ hotelDetails: APIHotelDetailsJSONFormatted }> = ({ hotelDetails }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState<{ image: string, alt: string } | null>(null);

    const ITEMS_PER_PAGE = 8;

    const nonRoomImages = hotelDetails?.images.filter(
        (image) => !image.description.toLowerCase().includes("room")
    );
    const totalPages = Math.ceil((nonRoomImages?.length || 0) / ITEMS_PER_PAGE);

    return (
        <>
            <div className="select-none">
                <h4 className="text-xl font-semibold mb-4">Other Images</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nonRoomImages
                        ?.slice(
                            (currentPage - 1) * ITEMS_PER_PAGE,
                            currentPage * ITEMS_PER_PAGE
                        )
                        .map((image, index) => (
                            <div
                                key={index}
                                className="rounded-lg shadow-lg overflow-hidden flex flex-col items-center bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
                            >
                                <Image
                                    src={image.url}
                                    alt={image.alt}
                                    width={800}
                                    height={400}
                                    className="w-full h-48 object-cover"
                                    onClick={() => setSelectedImage({ image: image.url, alt: image.alt })}
                                />
                                <p className="p-4 text-base-content">{image.description}</p>
                            </div>
                        ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6 mb-14 space-x-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="btn btn-accent"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="btn btn-accent"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
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
    )
}

export default PaginatedRoomImageGrid