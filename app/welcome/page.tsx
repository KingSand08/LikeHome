"use client";
import { useEffect, useState } from "react";
import MotionImageGallery from "./MotionImageGallery";
import Link from "next/link";

const WelcomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

  if (!isClient) {
    return null; // Prevent rendering until client-side
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-white dark:bg-neutral-800">
      {/* Main Content Section */}
      <div className="flex-grow flex flex-col justify-between">
        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8 pt-12 pb-5">
          Don&apos;t wait- book your stay now at{" "}
          <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
            LikeHome
          </span>{" "}
          website!
        </h4>

        {/* Image Gallery */}
        {isClient && <MotionImageGallery images={images} />}

        {/* Features Section */}
        <div className="flex justify-start items-center mt-6">
          <h3 className="pt-8 py-2 text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 ml-20">
            What We Have For You:
          </h3>
        </div>

        <div className="py-2 flex flex-col gap-y-6 items-start justify-start max-w-lg mx-auto">
          {[
            "Air conditioned rooms.",
            "We provide unbeatable deals and flexible booking options, making your stay more affordable.",
            "We offer unique properties like cozy homes and apartments in prime locations.",
            "Get tailor-made recommendations based on your preferences.",
            "3 large swimming pools.",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center">
              <span className="text-neutral-700 dark:text-neutral-300 mr-4">
                ✔
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <section className="w-full bg-gray-100 text-center p-6 mt-auto">
        <div className="flex justify-end items-center mt-6 space-x-8">
          <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 ml-20">
            Explore Your Dream Location Now
          </h3>

          <Link href="/" className="btn btn-primary btn-lg">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
