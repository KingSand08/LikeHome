import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";
import Image from "next/image";
import Link from "next/link";

type HotelRoomItemProps = {
  room: HotelRoomOffer;
};

const HotelRoomItem: React.FC<HotelRoomItemProps> = ({ room }) => {
  const CustomHotelRoomLink = `/rooms/${room.hotel_id}/${room.hotel_room_id}`;

  return (
    <div className="flex flex-col gap-6 bg-base-200 rounded-box p-6 shadow-lg">
      {/* Room Title */}
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{room.name}</h2>
        {room.pricePerNight.amount > 0 ? (
          <h1 className="text-5xl font-bold text-primary">
            ${room.pricePerNight.amount}
          </h1>
        ) : (
          <h1 className="text-5xl font-bold text-gray-400">Unavailable</h1>
        )}
        <span className="text-sm text-gray-500">{room.description}</span>
      </div>

      {/* Features */}
      <div className="carousel rounded-box w-96">
        {room.galleryImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <Image
              src={image.url}
              alt={image.description}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg"
            />
          </div>
        ))}
      </div>


      {/* Reserve Now Button */}
      <div className="text-center">
        {room.pricePerNight.amount > 0 ? (
          <Link href={CustomHotelRoomLink}>
            <div className="btn btn-primary">Reserve Now</div>
          </Link>
        ) : (
          <div className="btn btn-disabled">Unavailable</div>
        )}
      </div>
    </div>
  );
};

export default HotelRoomItem;
