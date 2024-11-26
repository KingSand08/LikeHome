"use client";
import { signIn } from 'next-auth/react';
import React from 'react';
import OAuthButton from './OAuthButton';
import Image from 'next/image';
import CancelButton from '../buttons/CancelButton';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const SigninPage = (props: Props) => {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center opacity-100 px-4 dark:text-gray-100">
            {/* Wrapper */}
            <div className="flex flex-col min-[1200px]:flex-row rounded-lg overflow-hidden w-full min-[1200px]:max-w-5xl max-w-md">
                {/* Left Section */}
                <div className="flex-1 p-6 md:p-10">
                    <h1 className="text-2xl md:text-3xl pb-4">Let&apos;s get started!</h1>
                    <p className="text-base md:text-lg opacity-90">
                        Welcome to LikeHome! Sign in with Google or provide your email to get started!
                        New users will have a short profile section to fill out once signing in for the first time.
                    </p>

                    {/* OAuth Buttons */}
                    <div className="mt-8 md:mt-14 flex flex-col items-center gap-4">
                        <OAuthButton callbackUrl={props.callbackUrl} provider="google" />
                        <OAuthButton callbackUrl={props.callbackUrl} provider="discord" />
                    </div>

                    {/* Error Message */}
                    {!!props.error && (
                        <div className="mt-6">
                            <p className="text-red-100 bg-red-600 p-4 rounded-lg w-full md:w-fit mx-auto">
                                {props.error === "CredentialsSignin" ? "Invalid email or password." : "Authentication Failed"}
                            </p>
                        </div>
                    )}

                    {/* Form User Choice Section */}
                    <div className="mt-8 flex flex-col items-center gap-4">
                        <CancelButton props={{
                            callbackUrl: props.callbackUrl ?? "/"
                        }} />
                    </div>
                </div>

                {/* Right (Image) Section */}
                <div className="relative flex items-center justify-center p-4 lg:p-6">
                    <Image
                        alt="likehome image"
                        src="/icons/app/likehome_form_icon.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="rounded-lg w-full lg:w-[30em] object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
