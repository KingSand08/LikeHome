import React from "react";

const RoomPage = ({ params }: { params: { roomID: string } }) => {
  return <div>RoomPage {params.roomID}</div>;
};

export default RoomPage;
