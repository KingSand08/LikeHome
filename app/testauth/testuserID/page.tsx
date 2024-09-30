import React from 'react'
import Image from 'next/image'
import { auth, signOut } from '@/auth'
import { redirect } from 'next/navigation'

export default async function TestAuth() {
  const session = await auth();
  console.log("Session:", session);

  if (!session) {
    redirect("/testauth");
  }


  const user = session?.user

  return (
    <>
      <div className='h-screen flex items-center justify-center' >
        <div className='bg-white flex rounded-lg w-3/4'>
          <div className='flex-1 text-gray-800 p-20'>
            <div className='flex-col'>
              <h1 className='text-3xl pb-2'>Test ID Page</h1>
              <img
                alt='likehome image'
                src="https://s7.orientaltrading.com/is/image/OrientalTrading/VIEWER_ZOOM/adults-killer-klowns-from-outer-space-fatso-overhead-mask-one-size~matdmgm100"
                className='object-cover w-10 h-10'
              />
            </div>
            <p className='text-lg text-gray-700'>
              This page is for dev only to test session user functionality.
            </p>
            <pre className='mt-12 text-2xl text-purple-600 italic'>{JSON.stringify(session, null, 2)}</pre>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                className='m-10 text-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-800 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-1/2'
              >
                Sign Out
              </button>
            </form>
            <div>
              <h2 className='pb-2 text-3xl'>{session.user.name}</h2>
              <h3 className='pb-2 text-2xl'>{session.user.email}</h3>
              <img className='pb-2 w-20' src={
                // "https://www.chantalhandley.com/cdn/shop/products/SOLD-KILLER-KLOWNS-FROM-OUTER-SPACE-Original-Pastel-Artwork-ChantalLauraHandley-989.jpg?v=1678084015" || 
                session.user.image} /><br />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

