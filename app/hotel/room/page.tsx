import React, { useState } from 'react';
import { FaWifi, FaTv, FaCoffee, FaConciergeBell, FaSwimmingPool } from 'react-icons/fa'; // Importing icons for amenities

export default function RoomPage() {

    {/* Fake Room Information */}
    const mockRoomData = 
    {
        id: 'room-1',
        title: 'Luxury Family Suite',
        description: 'Luxury room for a family of 4 with a beautiful sea view, complete with modern amenities.',
        price: '$250/night',
        available: true,
        imageUrl: 'image-url',
        amenities: ['Free WiFi', 'Flat-screen TV', 'Complimentary Breakfast', '24/7 Concierge Service', 'Swimming Pool Access'],
    }
    
    const images:string[] = [
        "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
        "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
        "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
        "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
        "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
        "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
        "https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp",
      ];

  return (
    <main className="container mx-auto p-6">
      {/* Carousel */}
      <div className="carousel rounded-box">
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                alt="Burger" />
            </div>

            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                alt="Burger" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                alt="Burger" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                alt="Burger" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                alt="Burger" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                alt="Burger" />
            </div>
            <div className="carousel-item">
                <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                alt="Burger" />
            </div>
        </div>
      <div
        className="hero h-80 bg-base-200 rounded-lg shadow-md mb-10 flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${mockRoomData.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative z-10 text-neutral-content">
          <h1 className="text-5xl font-bold mb-2 text-base-content">{mockRoomData.title}</h1>
          <p className="text-lg mb-4 text-base-content">{mockRoomData.description}</p>
        </div>
      </div>

      {/* Room Details Section */}
      <section className="w-full bg-base-100 p-8 rounded-lg shadow-md">
        <div className="flex w-full flex-col">
          {/* Room Description */}
          <div className="card rounded-box grid h-20 place-items-center p-4">
            <h2 className="text-3xl font-bold mb-2 text-base-content">Room Details</h2>
            <p className="text-base-content">
              {mockRoomData.description}
            </p>
          </div>

          {/* Divider */}
          <div className="divider mt-10"></div>

          {/* Amenities Section */}
          <div className="card rounded-box grid place-items-center p-4">
            <h3 className="text-2xl font-bold mb-3 text-base-content">Amenities</h3>
            <div className="flex flex-wrap gap-4 text-base-content">
              {mockRoomData.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-base-content">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="divider" ></div>

          {/* Booking Button */}
          <div className="card bg-base-300 rounded-box grid place-items-center p-4">
            <div className="card-actions justify-end">
            <p className="text-xl font-bold text-primary mt-2">
              {mockRoomData.price}
            </p>
              <button
                className={`btn btn-primary ${
                  !mockRoomData.available ? 'btn-disabled' : ''
                }`}
                disabled={!mockRoomData.available}
              >
                {mockRoomData.available ? 'Book Now' : 'Not Available'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
