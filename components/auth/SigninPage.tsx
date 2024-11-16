"use client";
import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';
import OAuthButton from './OAuthButton';
import Image from 'next/image';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const Signin = (props: Props) => {
    console.log(props.callbackUrl);

    const email = useRef("");
    const password = useRef("");
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl ?? "http://localhost:300"
        });
    };

    return (
        <div className={`h-[75vh] flex items-center justify-center`}>
            {/* Wrapper */}
            <div className={`${props.className} flex bg-white rounded-lg shadow-lg w-3/4`}>
                {/* Left Section */}
                <div className="flex-1 p-10 text-gray-800">
                    <h1 className="text-3xl pb-4">Let&apos;s get started!</h1>
                    <p className="text-lg text-gray-700">
                        Welcome to LikeHome! Sign in with Google or provide your email to get
                        started! New users will have a short profile section to fill out
                        once signing in for the first time.
                    </p>
                    {/* OAuth Buttons */}
                    <div className="mt-14 flex flex-col items-center gap-4">
                        <OAuthButton callbackUrl={props.callbackUrl} />
                    </div>
                    {/* Error Message */}
                    {!!props.error && (
                        <div className="mt-6">
                            <p className="text-red-100 bg-red-600 p-4 rounded-lg w-fit mx-auto">
                                {props.error === "CredentialsSignin" ? "Invalid email or password." : "Authentication Failed"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Section - Image */}
                <div className="relative flex items-center justify-end w-1/2">
                    <Image
                        alt="likehome image"
                        src="/likehome_form_icon.png"
                        layout="fill" // Ensures the image fills the container
                        objectFit="contain" // Maintains aspect ratio
                        quality={100}
                        className="rounded-lg" // Adds rounded corners
                    />
                </div>
            </div>
        </div>
    );
};

export default Signin;
