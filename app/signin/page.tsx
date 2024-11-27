"use client";
import React from 'react';
import SigninPage from '@/components/auth/SigninPage';
import styles from "@/app/styles/AnimatedBackground.module.css";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const Page = (props: Props) => {
  return (
    <div className="relative flex justify-center items-center min-h-screen pt-20 pb-16 max-[900px]:pt-7 max-[900px]:pb-12">
      {/* Background Design */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-700 to-blue-500 
          ${styles["animate-gradient"]} bg-[length:400%_400%]`}
      ></div>
      <div className="absolute inset-0 mix-blend-overlay bg-[url('/animations/patterns/dots-wave-animated.svg')] opacity-15"></div>

      {/* Sign-in Card + Positioning */}
      <div className="w-3/4 max-w-fit relative z-10 p-3 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-300/30 dark:border-slate-700/50">
        <div className="relative bg-gradient-to-r from-slate-200 via-white to-slate-200 dark:from-slate-800 dark:via-gray-900 dark:to-slate-800 rounded-2xl
         py-8 max-[900px]:px-3 px-8 border border-opacity-10 border-slate-300/30 dark:border-slate-700/50 shadow-md shadow-slate-500/20">
          <SigninPage
            error={props.searchParams?.error}
            callbackUrl={props.searchParams?.callbackUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
