// import React from "react";
// import { signOut } from "@/auth";
// import { redirect } from "next/navigation";

// export default function OAuthButton() {
//     return (
//         <>
//             {/* OAuth Login */}
//             {/* Process the sign-in */}
//             <form
//                 action={async () => {
//                     "use server"
//                     await signOut({ redirect: false })
//                     redirect('/signin');

//                 }}
//             >
//                 {/* Button display */}
//                 <button
//                     type="submit"
//                     className="px-4 py-2 bg-purple-700 hover:bg-purple-950 duration-150 text-white rounded hover:bg-black-500"
//                 >
//                     <p className="flex-grow text-center">
//                         SIGN OUT
//                     </p>
//                 </button>
//             </form>
//         </>
//     )
// }

"use client";
import { signOut } from 'next-auth/react';
import React from 'react'

interface ClassChange {
    className?: string;
    imgClassName?: string;
}

const SignOutButton = ({ className }: ClassChange) => {
    return (
        <button
            className="btn w-fit px-4 py-2 btn-secondary text-secondary-content rounded"
            onClick={() => signOut()}
        >
            Sign Out
        </button>
    );
}

export default SignOutButton