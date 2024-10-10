import React from "react";

const UniqueLocationAndUniqueRoomPage = ({ params }: { params: { slug: string } }) => {
  return <div>{params.slug}</div>;
};

export default UniqueLocationAndUniqueRoomPage;
