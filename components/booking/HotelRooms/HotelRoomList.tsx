import HotelRoomItem from "./HotelRoomItem";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";

type HotelRoomListProps = {
  rooms: HotelRoomOffer[];
};

const HotelRoomList: React.FC<HotelRoomListProps> = ({ rooms }) => {
  const filteredRooms = rooms.filter(
    (room) =>
      room.description !== "No description available" &&
      room.galleryImages.length > 0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRooms.map((room) => (
        <HotelRoomItem key={room.hotel_room_id} room={room} />
      ))}
    </div>
  );
};

export default HotelRoomList;
