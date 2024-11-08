import HotelRoomItem from "./HotelRoomItem";
import { HotelRoomOffer } from "@/app/api/hotels/search/rooms/route";

type HotelRoomListProps = {
  rooms: HotelRoomOffer[];
};

const HotelRoomList: React.FC<HotelRoomListProps> = ({ rooms }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <HotelRoomItem key={room.hotel_room_id} room={room} />
      ))}
    </div>
  );
};

export default HotelRoomList;
