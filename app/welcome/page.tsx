"use client";
import { useEffect, useState } from "react";
import MotionImageGallery from "./MotionImageGallery";
import Link from "next/link";
import { RainbowButton } from "@/components/ui/rainbow-button";

const WelcomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg"];

  return (
    <div className="w-full py-10 bg-white dark:bg-neutral-800">
      <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center">
        Don&apos;t wait book your stay now at&nbsp;
        <Link
          href="/"
          className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200"
        >
          LikeHome
        </Link>
        &nbsp; website!
      </h4>

      {/* Image Gallery */}
      {isClient && <MotionImageGallery images={images} />}

      {/* Features Section */}
      <div className="w-full flex justify-center">
        <div className="flex flex-col p-5">
          <h3 className="text-lg md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300">
            What We Have For You:
          </h3>
          <div className="flex flex-col gap-y-6 items-start justify-self-center max-w-lg p-10 pt-5">
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
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-5">
            <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              Explore Your Dream Location Now
            </h3>
            <Link href="/">
              <RainbowButton>Start Your Journey</RainbowButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
