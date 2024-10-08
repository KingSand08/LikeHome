import React from "react";

const UniqueLocationPage = ({ params }: { params: { slug: string } }) => {
  return <div>{params.slug}</div>;
};

export default UniqueLocationPage;
