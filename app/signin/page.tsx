"use client";
import React from 'react'
import SigninPage from '@/components/auth/SigninPage'

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}

const Page = (props: Props) => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-3/4'>
        <SigninPage
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </div>
  )
}

export default Page