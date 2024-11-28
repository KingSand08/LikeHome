import React from 'react'
import { APIHotelDetailsJSONFormatted } from '@/app/api/hotels/details/route';

const HotelLocation: React.FC<{ hotelDetails: APIHotelDetailsJSONFormatted }> = ({ hotelDetails }) => {
    return (
        <div className="mb-8 bg-gradient-to-r from-slate-700 to-slate-600 shadow-lg rounded-xl p-6 select-none">
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
                    <p className="text-gray-200">{hotelDetails.location.address.addressLine}</p>
                </div>
                <div className="flex items-center">
                    <span className="text-blue-300 font-semibold mr-2">City:</span>
                    <p className="text-gray-200">
                        {`${hotelDetails.location.address.city}, ${hotelDetails.location.address.province}`}
                    </p>
                </div>
                <div className="flex items-center">
                    <span className="text-blue-300 font-semibold mr-2">Country:</span>
                    <p className="text-gray-200">{hotelDetails.location.address.countryCode}</p>
                </div>
                <div className="flex items-center">
                    <span className="text-blue-300 font-semibold mr-2">Coordinates:</span>
                    <p className="text-gray-200">
                        {`${hotelDetails.location.coordinates.latitude}, ${hotelDetails.location.coordinates.longitude}`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HotelLocation;