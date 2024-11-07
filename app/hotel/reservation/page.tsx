import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

// Mock data
const mockHotelData = {
  name: "Rio Hotel & Casino",
  address: "3700 West Flamingo Road, Las Vegas, NV 89103, United States",
  amenities: ["Resort", "Parking", "Restaurant", "Swimming Pool"],
};

const mockBookingData = {
  checkIn: "Mon, Nov 25, 2024, from 3:00 PM",
  checkOut: "Tue, Nov 26, 2024, until 11:00 AM",
  lengthOfStay: "1 night",
  selection: "1 room for 2 adults",
};

const mockPriceSummary = {
  originalPrice: "$117.92",
  savings: "-$21.43",
  total: "$100",
};

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia",
  "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait",
  "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
  "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
  "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia",
  "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function ReservationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Timeline Step Indicator */}
      <ul className="timeline justify-center flex">
        <li>
          <div className="timeline-start timeline-box">Selection</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-primary h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <hr className="bg-primary" />
        </li>
        <li>
          <hr className="bg-primary" />
          <div className="timeline-start timeline-box">Details</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-primary h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <hr className="bg-primary" />
        </li>
        <li>
          <hr />
          <div className="timeline-start timeline-box">Payment</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </li>
      </ul>

      {/* Main content container with side-by-side layout on larger screens */}
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left Column - Hotel & Booking Details */}
        <div className="flex flex-col w-full lg:w-1/2">
          {/* Hotel Information Card */}
          <div className="card bg-base-100 w-full shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title">{mockHotelData.name}</h2>
              <p>{mockHotelData.address}</p>
              <div className="flex gap-2 mt-4">
                {mockHotelData.amenities.map((amenity, index) => (
                  <span key={index} className="badge">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Details Card */}
          <div className="card bg-base-100 w-full shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title">Your Booking Details</h2>
              <p>Check-in: {mockBookingData.checkIn}</p>
              <p>Check-out: {mockBookingData.checkOut}</p>
              <p>Total length of stay: {mockBookingData.lengthOfStay}</p>
              <p>You selected: {mockBookingData.selection}</p>
              <button className="btn btn-link text-info">Change your selection</button>
            </div>
          </div>

          {/* Price Summary Card */}
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Your Price Summary</h2>
              <p>Original price: {mockPriceSummary.originalPrice}</p>
              <p>Bonus savings: {mockPriceSummary.savings}</p>
              <div className="text-2xl font-bold text-primary mt-2">
                Total: {mockPriceSummary.total}
              </div>
              <p className="text-sm">Includes taxes and fees</p>
            </div>
          </div>
        </div>

        {/* Right Column - User Details Form */}
        <div className="flex flex-col w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Enter your details</h2>

          {/* Form Section */}
          <div className="space-y-4">
            <label className="form-control w-full">
              <span className="label-text">First Name *</span>
              <input type="text" placeholder="First Name" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Last Name *</span>
              <input type="text" placeholder="Last Name" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Email Address *</span>
              <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Phone Number</span>
              <input type="tel" placeholder="Phone Number" className="input input-bordered w-full" />
            </label>

            {/* Address Section */}
            <h3 className="text-lg font-semibold mt-6">Your Address</h3>
            <label className="form-control w-full">
              <span className="label-text">Address *</span>
              <input type="text" placeholder="Address" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">City *</span>
              <input type="text" placeholder="City" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">State *</span>
              <input type="text" placeholder="State" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Zip Code (optional)</span>
              <input type="text" placeholder="Zip Code" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Country/Region *</span>
              <select className="select select-bordered w-full">
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </label>
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary mt-8 w-full">Reserve Now</button>
        </div>
      </div>
    </div>
  );
}
