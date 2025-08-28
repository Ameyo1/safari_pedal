'use client';

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import Link from 'next/link';
import { useScroll } from '../navbar/hooks/useScroll';

export default function Header() {
// const scrolled = useScroll(90, 100);

//     const containerClasses = `
//     fixed top-0 w-full z-[1000] transition-all duration-200
//     ${scrolled ? 'bg-blue-950 shadow-md' : 'bg-blue-400'}
//     h-[7vh]
//   `;
  return (
    <div className='hidden md:flex justify-between items-center bg-blue-400 h-[7vh]'>
      {/* Left side: Contact info */}
      <div className="flex items-center space-x-6 hover:pointer">
        <span className="flex items-center space-x-4 ml-4 hover:pointer">
          <MdEmail />
          <Link href="mailto:info@example.com" className="hover:pointer hover:text-yellow-300">mpyangu@outlook.com</Link>
        </span>
        <span className="flex items-center space-x-4">
          <MdPhone />
          <Link href="tel:+1234567890" className="hover:pointer hover:text-yellow-300">+1 (510) 708-0049</Link>
        </span>
      </div>

      {/* Right side: Social + booking */}
      <div className="flex items-center space-x-4">
        <Link href="https://facebook.com" target="_blank" aria-label="Facebook" className="hover:pointer hover:text-yellow-300">
          <FaFacebook  />
        </Link>
        <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter className="hover:pointer hover:text-yellow-300" />
        </Link>
        <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram className="hover:pointer hover:text-yellow-300" />
        </Link>
        <Link
          href="/booking"
          className="ml-4 bg-yellow-400 text-black px-4 py-1 rounded hover:pointer hover:bg-yellow-500 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
