"use client";
import React from 'react'
import SigninPage from '@/components/auth/SigninPage'

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const Page = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen max-[1180px]:my-8'>
      <div className='w-3/4 max-w-fit shadow-2xl dark:shadow-lg dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 bg-gradient-to-r from-slate-300 to-slate-400 p-8 rounded-xl'>
        <SigninPage
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </div>
  )
}

export default Page