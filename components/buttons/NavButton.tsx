import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react'

const NavButton = ({ className, route, page }: { className: string, route: string, page: string }) => {
    return (
        <Link
            className={`flex-shrink-0 text-black hover:bg-slate-200 dark:text-white dark:hover:bg-white dark:hover:text-slate-800 hover:ease-in duration-100 rounded-lg py-2 px-3 ${className}`}
            href={route as Url}
        >
            {page}
        </Link>
    );
}

export default NavButton