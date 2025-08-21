'use client';

import Link from 'next/link';
import { navLinks } from '../constant/constant';

export default function DesktopLinks() {
  return (
    <div className=" lg:flex items-center space-x-10">
      {navLinks.map(({ id, name, url }) => (
        <Link key={id} href={url}>
          <p
            className="
              text-white text-base font-medium relative
              after:content-[''] after:absolute after:h-[3px] 
              after:bg-yellow-300 after:w-full after:scale-x-0
              hover:bg-yellow-300 after:transition-transform
              after:duration-300 after:origin-left
            "
          >
            {name}
          </p>
        </Link>
      ))}
    </div>
  );
}
