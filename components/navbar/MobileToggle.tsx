'use client';

import { HiBars3BottomRight } from 'react-icons/hi2';

type Props = { onClick: () => void };

export default function MobileToggle({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-white text-2xl lg:hidden focus:outline-none focus:ring-2 focus:ring-yellow-300"
      aria-label="Open navigation menu"
    >
      <HiBars3BottomRight />
    </button>
  );
}
