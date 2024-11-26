"use client";

import React, { useState, useEffect } from "react";

const FilterButton: React.FC = () => {
  const [buttonOffset, setButtonOffset] = useState(80); // Initial offset from the top of the navbar
  const [isSticky, setIsSticky] = useState(false); // To check if the button should stick

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Adjust the offset while scrolling
      const newOffset = Math.max(80 - scrollY * 1, 0);
      setButtonOffset(newOffset);

      // Update sticky state based on scroll position
      setIsSticky(scrollY > 150); // Adjust the threshold for "stickiness" as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <label
      htmlFor="my-drawer-2"
      className={`btn btn-primary fixed left-4 z-20 transition-transform duration-300 ${
        isSticky ? "top-4" : ""
      }`}
      style={{
        top: isSticky ? undefined : `${buttonOffset + 25}px`, // Use sticky class if applicable
      }}
    >
      Sort and Filter
    </label>
  );
};

export default FilterButton;
