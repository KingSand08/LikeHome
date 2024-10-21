import Image from 'next/image';
import React from 'react';

type CardProps = {
  name: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  hotelId: string;
};

export default function Card({ name, description, price, location, imageUrl, hotelId }: CardProps) {
  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <figure className="mb-4">
        <Image
          src={imageUrl}
          alt={name}
          width={200}
          height={150}
          className="w-full rounded-lg"
        />
      </figure>
      <div className="card-body p-0">
        <h2 className="card-title text-xl font-bold mb-2 text-base-content">{name}</h2>
        <p className="text-sm mb-2 text-base-content">{description}</p> {/* Allow full description */}
        <p className="text-lg font-semibold text-info mb-4">${price} / night</p>
        <div className="flex items-center justify-between text-gray-600">
          <p className="text-sm">{location}</p>
          <a href={`/hotel/${hotelId}`} className="btn btn-primary">
            Reserve Now
          </a>
        </div>
      </div>
    </div>
  );
}
