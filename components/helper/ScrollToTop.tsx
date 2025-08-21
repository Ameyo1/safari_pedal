'use client'

import React, { useEffect } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    useEffect(() => {
        const handleScroll = () => {    
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
const scrollToTop = () => {
    window.scrollTo({  
        top: 0,
        behavior: 'smooth'
    });
}

  return (
    <div className='fixed animate-pulse bottom-4 right-4'>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className='bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors'
        >
          ↑
        </button>
      )}
    </div>
  )
}

export default ScrollToTop
