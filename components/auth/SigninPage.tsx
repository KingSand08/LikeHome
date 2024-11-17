"use client";
import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';
import OAuthButton from './OAuthButton';
import Image from 'next/image';
import CancelButton from '../buttons/CancelButton';

type Props = {
    className?: string;
    callbackUrl?: string;
    error?: string;
};

const SigninPage = (props: Props) => {
    console.log(props.callbackUrl);

    const email = useRef("");
    const password = useRef("");
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            email: email.current,
            password: password.current,
            redirect: true,
            callbackUrl: props.callbackUrl ?? "http://localhost:3001"
        });
    };

    return (
        <div className="flex items-center justify-center">
            {/* Wrapper */}
            <div className="flex bg-white rounded-lg shadow-lg">
                {/* Left Section */}
                <div className="flex-1 p-10 text-gray-800 w-[40em]">
                    <h1 className="text-3xl pb-4">Let&apos;s get started!</h1>
                    <p className="text-lg text-gray-700">
                        Welcome to LikeHome! Sign in with Google or provide your email to get
                        started! New users will have a short profile section to fill out
                        once signing in for the first time.
                    </p>
                    {/* OAuth Buttons */}
                    <div className="mt-14 flex flex-col items-center gap-4">
                        <OAuthButton callbackUrl={props.callbackUrl} provider="google" />
                        <OAuthButton callbackUrl={props.callbackUrl} provider="discord" />
                    </div>
                    {/* Error Message */}
                    {!!props.error && (
                        <div className="mt-6">
                            <p className="text-red-100 bg-red-600 p-4 rounded-lg w-fit mx-auto">
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
                <div className="relative flex items-center justify-end ml-auto">
                    <Image
                        alt="likehome image"
                        src="/icons/likehome_form_icon.png"
                        width={1000}
                        height={1000}
                        quality={100}
                        className="rounded-lg w-[30em]"
                    />
                </div>
            </div>
        </div>
    );
};

export default SigninPage;
