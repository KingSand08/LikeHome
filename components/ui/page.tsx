"use client";

import HotelRoomList from "@/components/booking/HotelRooms/HotelRoomList";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { APIHotelDetailsJSONFormatted } from "@/app/api/hotels/details/route";
import { APIHotelRoomOffersJSONFormatted } from "@/app/api/hotels/search/rooms/route";
import Image from "next/image";
import {
  fetchAllHotelRoomOffers,
  fetchHotelDetails,
} from "@/server-actions/api-actions";
import LoadingPage from "@/components/ui/Loading/LoadingPage";

type CompleteHotelInfo = {
  hotelDetails: APIHotelDetailsJSONFormatted | null;
  hotelRooms: APIHotelRoomOffersJSONFormatted | null;
} | null;

const HotelIDPage: React.FC = () => {
  const { hotelId: hotelIdSlug } = useParams();
  const searchParams = useSearchParams();
  const [hotelData, setHotelData] = useState<CompleteHotelInfo>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHotelData(null);

      try {
        const HOTEL_DETAILS_DATA = await fetchHotelDetails(
          hotelIdSlug,
          searchParams
        );
        if (!HOTEL_DETAILS_DATA) {
          throw new Error("Hotel details not found");
        }

        const HOTEL_ROOM_OFFERS_DATA = await fetchAllHotelRoomOffers(
          hotelIdSlug,
          searchParams
        );
        if (!HOTEL_ROOM_OFFERS_DATA) {
          throw new Error("Hotel room offers not found");
        }

        setHotelData({
          hotelDetails: HOTEL_DETAILS_DATA,
          hotelRooms: HOTEL_ROOM_OFFERS_DATA,
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hotelIdSlug, searchParams]);

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  if (error || !hotelData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-lg mb-6">
          {`We couldn't load the hotel data. Please try again later.`}
        </p>
        <button
          className="btn btn-primary text-base-100 px-6 py-3 rounded-lg"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    );
  }

  const { hotelDetails, hotelRooms } = hotelData;

  const ITEMS_PER_PAGE = 8;
  const nonRoomImages = hotelDetails?.images.filter(
    (image) => !image.description.toLowerCase().includes("room")
  );
  const totalPages = Math.ceil((nonRoomImages?.length || 0) / ITEMS_PER_PAGE);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hotel Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">{hotelDetails?.name}</h1>
        <h2 className="text-xl text-white">{hotelDetails?.tagline}</h2>
      </div>

      {/* Hotel Location */}
      <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg rounded-xl p-6">
        <h3 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="25.000000pt"
            height="25.000000pt"
            viewBox="0 0 50.000000 50.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
              fill="currentColor"
              stroke="none"
            >
              <path d="M71 481 c-16 -10 -3 -41 18 -42 13 0 13 -2 1 -6 -48 -18 -50 -26 -50
                    -215 l0 -178 90 0 90 0 0 50 c0 49 1 50 30 50 29 0 30 -1 30 -50 l0 -50 90 0
                    90 0 0 178 c0 189 -2 197 -50 215 -12 4 -12 6 1 6 21 1 34 32 18 42 -20 12
                    -39 -1 -39 -27 0 -21 -4 -24 -37 -23 -21 0 -31 3 -23 6 30 12 38 38 14 47 -23
                    9 -43 -11 -37 -34 4 -16 0 -20 -17 -20 -18 0 -21 4 -16 24 6 26 -12 40 -39 30
                    -10 -4 -13 -14 -9 -30 5 -20 2 -24 -16 -24 -17 0 -21 4 -17 20 6 23 -14 43
                    -37 34 -24 -9 -16 -35 14 -47 8 -3 -2 -6 -22 -6 -34 -1 -38 2 -38 23 0 26 -19
                    39 -39 27z m89 -121 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16 7 20 30
                    20 23 0 30 -4 30 -20z m120 0 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16
                    7 20 30 20 23 0 30 -4 30 -20z m120 0 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30
                    20 0 16 7 20 30 20 23 0 30 -4 30 -20z m-240 -80 c0 -16 -7 -20 -30 -20 -23 0
                    -30 4 -30 20 0 16 7 20 30 20 23 0 30 -4 30 -20z m120 0 c0 -16 -7 -20 -30
                    -20 -23 0 -30 4 -30 20 0 16 7 20 30 20 23 0 30 -4 30 -20z m120 0 c0 -16 -7
                    -20 -30 -20 -23 0 -30 4 -30 20 0 16 7 20 30 20 23 0 30 -4 30 -20z m-240 -80
                    c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16 7 20 30 20 23 0 30 -4 30 -20z
                    m120 0 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16 7 20 30 20 23 0 30 -4
                    30 -20z m120 0 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16 7 20 30 20 23
                    0 30 -4 30 -20z m-240 -80 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20 0 16 7
                    20 30 20 23 0 30 -4 30 -20z m240 0 c0 -16 -7 -20 -30 -20 -23 0 -30 4 -30 20
                    0 16 7 20 30 20 23 0 30 -4 30 -20z"
              />
            </g>
          </svg>
          <span>Location</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-top">
            <span className="text-blue-300 font-semibold mr-2">Address:</span>
            <p className="text-gray-200">{hotelDetails?.location.address.addressLine}</p>
          </div>
          <div className="flex items-center">
            <span className="text-blue-300 font-semibold mr-2">City:</span>
            <p className="text-gray-200">
              {`${hotelDetails?.location.address.city}, 
              ${hotelDetails?.location.address.province}`}
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-blue-300 font-semibold mr-2">Country:</span>
            <p className="text-gray-200">{hotelDetails?.location.address.countryCode}</p>
          </div>
          <div className="flex items-center">
            <span className="text-blue-300 font-semibold mr-2">Coordinates:</span>
            <p className="text-gray-200">
              {`${hotelDetails?.location.coordinates.latitude}, 
              ${hotelDetails?.location.coordinates.longitude}`}
            </p>
          </div>
        </div>
      </div>

      {/* Hotel Images */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Hotel Images</h3>

        {/* Room Images Carousel */}
        <div className="mb-12">
          <h4 className="text-xl font-semibold mb-4">Room Images</h4>
          <div className="carousel w-full bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-xl  shadow-lg">
            {hotelData?.hotelDetails?.images
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
                      onClick={() => openModal(image.url)} // Open modal on click
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

        {/* Paginated Non-Room Images */}
        <div>
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
                    onClick={() => openModal(image.url)}
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

        {/* Room Offers */}
        <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Room Offers</h2>
          {hotelRooms ? (
            <div>
              <p className="text-slate-200 mb-6">
                Base Price Per Night:{" "}
                <span className="font-semibold">
                  {hotelRooms.basePricePerNight}
                </span>
              </p>
              <div>
                <h3 className="text-xl font-semibold mb-4">Room List</h3>
                <HotelRoomList rooms={hotelRooms.hotelRoomOffers} />
              </div>
            </div>
          ) : (
            <p className="text-gray-100">No rooms available</p>
          )}
        </div>
      </div>
      {/* Modal for Image Display */}
      {selectedImage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-5xl">
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
            <div className="modal-action">
              <button
                className="btn btn-error"
                onClick={closeModal} // Close modal on click only (work on another way later or use another comp)
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelIDPage;