import React from 'react'
import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"
import Image, { StaticImageData } from 'next/image'
import formImage from '../../public/likehome_form_icon.png'
import GitHubImage from '../../public/icons/github.icon.png'
import GoogleImage from '../../public/icons/google.icon.png'
import InstagramImage from '../../public/icons/instagram.icon.png'
import FacebookImage from '../../public/icons/meta.icon.png'
import XImage from '../../public/icons/x-twitter.icon.png'


export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  const SIGNIN_ERROR_URL = "/api/auth/signin";

  const providerIcons: { [key: string]: StaticImageData } = {
    github: GitHubImage,
    google: GoogleImage,
    instagram: InstagramImage,
    facebook: FacebookImage,
    twitter: XImage
  };

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='bg-white flex rounded-lg w-3/4'>
        <div className='flex-1 text-gray-800 p-20'>
          <h1 className='text-3xl pb-2'>Let&apos;s get started!</h1>
          <p className='text-lg text-gray-700'>
            This page will be for testing purposes only until a login page has been
            made and approved. Users can login and choose one of the providers to
            log into below.
          </p>
          <div className='mt-6'>
            {Object.values(providerMap).map((provider) => (
              <form
                key={provider.id}
                action={async () => {
                  "use server"
                  try {
                    await signIn(provider.id, {
                      redirectTo: props.searchParams?.callbackUrl ?? "",
                    })
                  } catch (error) {
                    // Signin can fail for a number of reasons, such as the user
                    // not existing, or the user not having the correct role.
                    // In some cases, you may want to redirect to a custom error
                    if (error instanceof AuthError) {
                      return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                    }

                    // Otherwise if a redirects happens Next.js can handle it
                    // so you can just re-thrown the error and let Next.js handle it.
                    // Docs:
                    // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                    throw error
                  }
                }}
              >
                <button type='submit' className='flex items-center mb-2 border border-transparent rounded-md shadow-sm px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full'>
                  <Image
                    alt={`${provider.name} logo`}
                    src={providerIcons[provider.name.toLowerCase()]}
                    width={40} // Set the desired width
                    height={40} // Set the desired height
                  />
                  <p className='flex-grow text-center'>Sign in with {provider.name}</p>
                </button>
              </form>
            ))}
            {/* Section divider input field */}
            <div>
              <p className='mb-2 text-center'>or</p>
            </div>
            {/* Email input field */}
            <div className='pb-4 flex flex-col items-center'>
              <input
                className='p-2 border-2 border-gray-600 rounded-md w-full focus:border-purple-600 focus:ring-purple-500 focus:outline-none'
                type='email'
                name='email'
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
      </div>
    </div>
  )
}