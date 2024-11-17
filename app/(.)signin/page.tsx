"use client";
import React from "react";
import SigninPage from '@/components/auth/SigninPage'
import ModalRoute from "@/components/modal/ModalRoute";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInModal = ({ searchParams }: Props) => {
    return (
        <div>
            <ModalRoute callbackUrl={searchParams?.callbackUrl}>
                <div className="">
                    <SigninPage error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
                </div>
            </ModalRoute>
        </div>
    );
};

export default SignInModal;
