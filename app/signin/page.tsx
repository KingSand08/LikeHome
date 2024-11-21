"use client";
import React from 'react'
import SigninPage from '@/components/auth/SigninPage'

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const Page = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-3/4 max-w-fit shadow-lg bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-xl'>
        <SigninPage
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </div>
  )
}

export default Page