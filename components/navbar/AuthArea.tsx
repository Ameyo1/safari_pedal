'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function AuthArea() {
  const { data: session, status } = useSession();

  // Show loading skeleton
  if (status === 'loading') {
    return <div className="w-24 h-8 bg-gray-200 animate-pulse rounded" />;
  }

  // Helper to safely get user image
  const getUserImage = () => {
    if (!session?.user?.coverImage || typeof session.user.coverImage !== 'string' || !session.user.coverImage.trim()) {
      return '/images/avatar.webp';
    }
    return session.user.coverImage;
  };

  // If user is signed in
  if (session?.user) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-white text-base font-medium"
        >
          Sign out
        </button>
        <Link href={`/user-profile`}>
          <div className="flex items-center cursor-pointer">
            <Image
              src={getUserImage()}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-2 text-white">{session.user.name}</span>
          </div>
        </Link>
      </div>
    );
  }

  // If user is not signed in
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/signin"
        className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="bg-green-400 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}
