"use client";
import React from 'react'
import Signin from '@/components/auth/SigninPage'

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
}


const Page = (props: Props) => {

  return (
    <div className='flex justify-center m-[2em]'>

      <Signin
        error={props.searchParams?.error}
        callbackUrl={props.searchParams?.callbackUrl}
      />
    </div>
  )
}

export default Page