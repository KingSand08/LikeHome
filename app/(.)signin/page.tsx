"use client";
import React from "react";
import SigninPage from '@/components/auth/SigninPage'
import Modal from "@/components/modal/Modal";
import styles from "@/app/styles/AnimatedBackground.module.css";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInModal = ({ searchParams }: Props) => {
    return (
        <div className="relative flex justify-center items-center h-screen max-[1200px]:pt-24">
            {/* Background Design */}
            <div
                className={`h-screen w-screen absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-700 to-blue-500 
                            ${styles["animate-gradient"]} bg-[length:400%_400%]`}
            ></div>
            <div className="absolute inset-0 mix-blend-overlay bg-[url('/animations/patterns/dots-wave-animated.svg')] opacity-15"></div>

            {/* Modal and Rendered Child Page */}
            <Modal
                callbackUrl={searchParams?.callbackUrl}
                className="dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 
                           bg-gradient-to-r from-slate-200 to-slate-300">
                <div className="">
                    {/* Sign-in Card */}
                    <SigninPage error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
                </div>
            </Modal>
        </div>
    );
};

export default SignInModal;
