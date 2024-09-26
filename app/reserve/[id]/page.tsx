import { useRouter } from "next/router";
import React from "react";

const router = useRouter();

const ReserveRoomPage = () => {
  return <div>ReserveRoomPage {router.query.id}</div>;
};

export default ReserveRoomPage;
