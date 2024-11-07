'use client';
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function LandingPage() {
    const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    ];

    return (
    <>
        <div className="w-full flex flex-col h-screen ">
        <div className="flex-grow bg-white dark:bg-neutral-800 ">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8 pt-12 pb-5">
            Don't wait- book your stay now at{" "}
            <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                LikeHome
            </span>{" "}
            website!
            </h4>
            <div className="flex justify-center items-center">
            {images.map((image, idx) => (
                <motion.div
                key={"images" + idx}
                style={{
                  rotate: Math.random() * 20 - 10,
                }}
                whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                }}
                whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                }}
                className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                <Image
                    src={image}
                    alt="bali images"
                    width={500}
                    height={500}
                    className="rounded-lg h-20 w-20 md:h-60 md:w-60 object-cover flex-shrink-0"
                />
                </motion.div>
            ))}
            </div>
            <div className="flex justify-mild items-center mt-6 ">
            <h3 className=" pt-8 py-2 justify-end text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 ml-20">
                What We Have For You:
            </h3>
            </div>
            <div className="py-2 flex flex-col gap-y-6 items-start justify-start max-w-lg mx-auto">
            
            <div className="flex items-center">
                <span className="text-neutral-700 dark:text-neutral-300  mr-4">✔</span>
                <span className="text-neutral-700 dark:text-neutral-300 ">
                Air conditioned rooms.
                </span>
            </div>
            <div className="flex items-center">
                <span className="text-neutral-700 dark:text-neutral-300  mr-4">✔</span>
                <span className="text-neutral-700 dark:text-neutral-300 ">
                We provide unbeatable deals and flexible booking options, making your stay more affordable.
                </span>
            </div>
            <div className="flex items-center">
                <span className="text-neutral-700 dark:text-neutral-300  mr-4">✔</span>
                <span className="text-neutral-700 dark:text-neutral-300 ">
                We offer unique properties like cozy homes and apartments in prime locations.
                </span>
            </div>
            <div className="flex items-center">
                <span className="text-neutral-700 dark:text-neutral-300  mr-4">✔</span>
                <span className="text-neutral-700 dark:text-neutral-300 ">
                Get tailor-made recommendations based on your preferences.
                </span>
            </div>
            <div className="flex items-center">
                <span className="text-neutral-700 dark:text-neutral-300  mr-4">✔</span>
                <span className="text-neutral-700 dark:text-neutral-300 ">
                3 large swimming pools.
                </span>
            </div>
            
            </div>

            <footer className="w-full bg-gray-100 text-center p-6 mt-auto" >
            <div className="flex justify-end items-center mt-6 space-x-8">
                <h3 className=" text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-2 ml-20">
                Explore Your Dream Location Now
                </h3>
                <Link href="/">
                <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-3 py-3 rounded-md border border-black ">
                    Start Your Journey
                </button>
                </Link>
            </div>
            </footer>
        </div>
        </div>
    </>
    );
}