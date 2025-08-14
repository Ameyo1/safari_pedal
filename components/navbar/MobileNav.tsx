'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CgClose } from "react-icons/cg";
import { navLinks } from "../constant/constant";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNavbar = ({ showNav, closeNav }: Props) => {
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Ensure portal only renders after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll and manage focus when menu is shown
  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = showNav ? "hidden" : "";
    if (showNav && menuRef.current) {
      menuRef.current.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showNav, mounted]);

  // Avoid SSR mismatch
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          showNav ? "opacity-70" : "opacity-0 pointer-events-none"
        } z-[999]`}
      />

      {/* Mobile Menu */}
      <div
        role="dialog"
        aria-modal="true"
        ref={menuRef}
        tabIndex={-1}
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[60%] bg-rose-100 transform duration-300 ${
          showNav ? "translate-x-0" : "-translate-x-full"
        } z-[1000] p-6 flex flex-col items-center justify-center space-y-6`}
      >
        <button
          aria-label="Close menu"
          onClick={closeNav}
          className="absolute top-4 right-8 text-white text-2xl sm:text-3xl"
        >
          <CgClose />
        </button>
        <nav>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-white text-[20px] sm:text-[30px] font-medium hover:text-yellow-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>,
    document.body
  );
};

export default MobileNavbar;
