import Image from 'next/image';
import React from 'react';

export default function Card() {
  return (
    <div className="card card-compact bg-neutral shadow-xl w-full">
      <figure>
        <Image
          src="/hotelRoom.jpg"
          alt="Hotel room"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-neutral-content">Hotel Room</h2>
        <p>Hotel Room Description</p>
        <div className="card-actions justify-end">
          <a href='/reserve'>
            <button className="btn btn-accent text-accent-content">Buy Now</button>
          </a>
        </div>
      </div>
    </div>
  );
}