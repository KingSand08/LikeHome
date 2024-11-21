"use client";
import ClassChange from '@/types/ui/classChange';
import { signOut } from 'next-auth/react';
import React from 'react'

const SignOutButton = ({ className }: ClassChange) => {
    return (
        <button
            className={`${className} btn w-fit px-4 py-2 btn-secondary rounded`}
            onClick={() => signOut()}
        >
            Sign Out
        </button>
    );
}

export default SignOutButton