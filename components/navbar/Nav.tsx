'use client';

import React from 'react';
import AuthArea from './AuthArea';
import MobileToggle from './MobileToggle';
import { useScroll } from './hooks/useScroll';
import Logo from './logo';
import DesktopLinks from './DesktopLinks';

type Props = { openNav: () => void };

export default function Nav({ openNav }: Props) {
  const scrolled = useScroll(90, 100);

  const containerClasses = `
    fixed top-11 w-full z-[1000] border-white border-b transition-all duration-200
    ${scrolled ? 'bg-blue-950 shadow-md' : 'bg-green-50-200 dark:bg-gray-800 text-black'}
    h-[14vh]
  `;

  return (
    <nav className={containerClasses}>
      <div className="flex justify-between text-gray-800 items-center mx-auto h-full w-[90%] mt-6 dark:text-white ">
        <Logo />
        <DesktopLinks />
        <div className="flex items-center">
          <AuthArea />
          <MobileToggle onClick={openNav} />
        </div>
      </div>
    </nav>
  );
}
