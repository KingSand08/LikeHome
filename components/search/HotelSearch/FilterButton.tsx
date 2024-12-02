"use client";

import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";

const FilterButton: React.FC = () => {
  const [buttonOffset, setButtonOffset] = useState(90);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to detect screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1200);
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
        setIsSticky(scrollY > 0); // For mobile, make it sticky as soon as scrolling starts
      } else {
        // Dynamic offset for desktop
        const newOffset = Math.max(90 - scrollY * 1, 0);
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
      className={`btn btn-outline btn-primary fixed left-4 z-20 transition-transform duration-300 ${isMobile ? "top-[180px] btn-md" : ""}`}
      style={{
        top: !isMobile && !isSticky ? `${buttonOffset + 50}px` : undefined,
      }}
    >
      <Filter />
    </label>
  );
};

export default FilterButton;
