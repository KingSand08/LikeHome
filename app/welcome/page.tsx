import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-customBlue text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen text-center p-8">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Perfect Stay with LikeHome
        </h1>
        <p className="text-lg mb-6">
          Get exclusive deals on unique homes, apartments, and more.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Start Your Journey
        </Link>
      </section>

      {/* Why Choose LikeHome */}
      <section className="bg-white text-black py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Why Choose LikeHome?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">More Personalization</h3>
              <p>
                With LikeHome, you get tailor-made recommendations based on your
                preferences.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Unique Stays</h3>
              <p>
                Unlike hotels, we offer unique properties like cozy homes and
                apartments in prime locations.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Competitive Pricing</h3>
              <p>
                We provide unbeatable deals and flexible booking options, making
                your stay more affordable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center justify-center py-12 bg-customBlue text-white">
        <h2 className="text-4xl font-bold mb-6">
          Book Your Dream Location Now
        </h2>
        <Link href="/" className="btn btn-primary btn-lg">
          Explore Our Listings
        </Link>
      </section>
    </div>
  );
};

export default WelcomePage;
