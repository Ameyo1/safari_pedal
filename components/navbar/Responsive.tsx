'use client'

import React, { useState } from 'react'
import Nav from './Nav'
import MobileNavbar from './MobileNav';
import Header from '../helper/header';

const ResponsiveNav = () => {
  // State to control the visibility of the mobile navigation
  // Initially set to false, meaning the mobile navigation is hidden
  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav(true);
  };
  const closeNav = () => {
    setShowNav(false);
  };
  return (
    <div>
      <Header />
      <Nav openNav={toggleNav} />
      <MobileNavbar showNav={showNav} closeNav={closeNav} />
    </div>
  )
}

export default ResponsiveNav
