'use client'

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HiBars3BottomRight } from "react-icons/hi2";
import { navLinks } from "../constant/constant";
type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
//   const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        navBg ? "bg-blue-950 shadow-md" : "fixed"
      } transition-all duration-200 h-[12vh] fixed w-full z-[1000]`}
    >
      <div className="flex justify-between items-center h-full w-[90%] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="logo" width={54} height={30} />
          <span className="text-2xl font-bold text-black ml-2 sm:hidden lg:block">
            PEDAL SAFARI
          </span>
        </Link>
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link href={link.url} key={link.id}>
              <p
                className="relative text-white text-base font-medium w-fit block after:block
                       after:content-[``] after:absolute after:h-[3px] after:bg-yellow-300 after:w-full 
                       after:scale-x-0 after:hover:scale-x-100 after:transition duration-300 after:origin-right hover:after:origin-right "
              >
                {link.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {/* {session && session.user ? (
            <> */}
              {/* <div
                onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
                className="text-white text-base font-medium"
              >
              </div> */}
              {/* <Link href={`/user/${session.user.id || ""}`}>
                <div className="flex items-center">
                  <Image
                    src={session.user.image && session.user.image.trim() !== "" ? session.user.image : "/default-avatar.png"}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="ml-2 text-white">{session.user.name}</span>
                </div>
              </Link> */}
            {/* </>
          ) : ( */}
            <>
              <Link
                href="/signin"
                className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-200"
              >
                Login
              </Link>
              
                <Link
                href="/participate/medical"
                className="bg-yellow-300 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition duration-200"
              >
                Register
              </Link>
            </>
          {/* )} */}
          <HiBars3BottomRight
            onClick={openNav}
            className="text-white text-2xl lg:hidden cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
