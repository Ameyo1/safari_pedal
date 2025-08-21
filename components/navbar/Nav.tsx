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
    fixed top-0 w-full z-[1000] transition-all duration-200
    ${scrolled ? 'bg-blue-950 shadow-md' : 'bg-transparent'}
    h-[12vh]
  `;

  return (
    <nav className={containerClasses}>
      <div className="flex justify-between items-center h-full w-[90%] mx-auto">
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
