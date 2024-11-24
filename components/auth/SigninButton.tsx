"use client";
import ClassChange from '@/types/ui/classChange';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const SignInButton = ({ className }: ClassChange) => {
    const pathname = usePathname();

    return (
        <Link
            className={`${className} btn w-fit px-4 py-2 btn-primary rounded`}
            href={`/signin?callbackUrl=${encodeURIComponent(pathname)}`}
        >
            SIGN IN
        </Link>
    );
}

export default SignInButton