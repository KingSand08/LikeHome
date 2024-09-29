"use client"; // Add this line at the top
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import formImage from '../../public/likehome_form_icon.png'

export default function TestAuth() {
  const [email, setEmail] = useState("");
  return (
    <div className='h-screen flex items-center justify-center'>
      <form className='bg-white flex rounded-lg w-3/4'>
        <div className='flex-1 text-gray-800 p-20'>
          <h1 className='text-3xl pb-2'>Let&apos;s get started!</h1>
          <p className='text-lg text-gray-700'>
            This page will be for testing purposes only until a login page has been
            made and approved. Users can login and choose one of the providers to
            log into below.
          </p>
          <div className='mt-6'>
            {/* Google sign-in button */}
            <div className='pb-2 flex flex-col items-center'>
              <button className='flex items-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full'>
                <img
                  src="https://static.vecteezy.com/system/resources/previews/013/948/549/original/google-logo-on-transparent-white-background-free-vector.jpg"
                  alt="Google Logo"
                  className="h-7"
                />
                <p className='flex-grow text-center'>
                  Sign in with Google
                </p>
              </button>
            </div>
            {/* Instagram sign-in button */}
            <div className='pb-2 flex flex-col items-center'>
              <button className='flex items-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full'>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-instagram-new-circle-512.png"
                  alt="Instagram Logo"
                  className="h-7"
                />
                <p className='flex-grow text-center'>
                  Sign in with Instagram
                </p>
              </button>
            </div>
            { }
            <div className='pb-2 flex flex-col items-center'>
              <button className='flex items-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full'>
                <img
                  src="https://freepnglogo.com/images/all_img/1723789425facebook-f-logo.png"
                  alt="Facebook Logo"
                  className="h-7"
                />
                <p className='flex-grow text-center'>
                  Sign in with Facebook
                </p>
              </button>
            </div>
            {/* X sign-in button */}
            <div className='pb-2 flex flex-col items-center'>
              <button className='flex items-center border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full'>
                <img
                  src="https://freepnglogo.com/images/all_img/1725374683twitter-x-logo.png"
                  alt="X Logo"
                  className="h-7"
                />
                <p className='flex-grow text-center'>
                  Sign in with X
                </p>
              </button>
            </div>
            <div>
              <p className='mb-2 text-center'>or</p>
            </div>
            {/* Email input field */}
            <div className='pb-4 flex flex-col items-center'>
              <input
                className='p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email'
              />
            </div>
          </div>
        </div>
        <div className='relative flex-1'>
          <Image
            alt='likehome image'
            src={formImage}
            fill
            className='object-cover rounded-lg'
          />
        </div>
      </form>
    </div>
  )
}

