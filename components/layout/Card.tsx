import Image from 'next/image';
import React from 'react';

export default function Card() {
  return (
    <div className="card card-compact bg-neutral shadow-xl w-full">
      <figure>
        <Image
          src="https://as2.ftcdn.net/v2/jpg/00/48/05/67/1000_F_48056772_4xzGQerR7lW82z7MPTN8AulMraNIOZEJ.jpg"
          alt="Shoes"
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