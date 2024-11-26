"use client";

import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";

const FilterButton: React.FC = () => {
  const [buttonOffset, setButtonOffset] = useState(80); 
  const [isSticky, setIsSticky] = useState(false); 
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    // Function to detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (isMobile) {
        // Fixed offset for mobile
        setButtonOffset(80);
        setIsSticky(scrollY > 0); // For mobile, make it sticky as soon as scrolling starts
      } else {
        // Dynamic offset for desktop
        const newOffset = Math.max(80 - scrollY * 1, 0);
        setButtonOffset(newOffset);
        setIsSticky(scrollY > 150); // Adjust sticky threshold for desktop
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  return (
    <label
      htmlFor="my-drawer"
      className={`btn btn-outline btn-primary fixed left-4 z-20 transition-transform duration-300 ${
        isMobile || isSticky ? "top-4 left-4" : ""
      }`}
      style={{
        top: !isMobile && !isSticky ? `${buttonOffset + 25}px` : undefined,
      }}
    >
      <Filter />
    </label>
  );
};

export default FilterButton;
