"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/nextjs';

export default function Hero() {
  const { isSignedIn } = useUser(); // Get user authentication status

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-white text-center">
      {/* First Section */}
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 mb-8 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
          Introducing feedbackify.{' '}
          <Link href="#" className="ml-1 font-semibold text-green-600 hover:underline">
            Read more →
          </Link>
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Collect your feedbacks seamlessly
        </h1>

        <p className="mb-10 text-xl text-gray-600">
          Easily integrate feedbackify and start collecting feedbacks today.
        </p>

        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link href={isSignedIn ? '/dashboard' : 'https://prime-moray-67.accounts.dev/sign-in?redirect_url=https%3A%2F%2Ffeedbacify-landing.vercel.app%2F'}>
            <Button className="px-8 py-3 text-base font-semibold text-white bg-black rounded-md transition duration-300">
              Get Started
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-3 text-base font-semibold text-gray-700 border-gray-300 hover:bg-gray-100 rounded-md transition duration-300">
            Learn more →
          </Button>
        </div>
      </div>

      {/* Divider Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>

        {/* Second Section */}
        <div className="mt-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden w-[800px]">
          <div className="flex items-center justify-start p-2 bg-gray-900">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <div className="p-4">
            <video
              src="/demoo.mp4"
              width={800}
              height={300}
              className="w-full h-auto"
              controls
              autoPlay
              loop
              muted
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
