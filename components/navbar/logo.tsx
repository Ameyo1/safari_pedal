'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src="/images/logo.jpg" alt="Pedal Safari Logo" width={54} height={30} />
      <span className="text-2xl font-bold text-black ml-2 hidden sm:block">
        PEDAL SAFARI
      </span>
    </Link>
  );
}
