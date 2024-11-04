import React, { useState } from "react";

type PriceRangeSliderProps = {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (priceRange: { price_min: number; price_max: number }) => void;
};

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [priceRange, setPriceRange] = useState<{
    price_min: number;
    price_max: number;
  }>({
    price_min: minPrice,
    price_max: maxPrice,
  });

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean
  ) => {
    let value = Math.round(Number(e.target.value));

    value = Math.max(minPrice, Math.min(maxPrice, value));

    let updatedRange = { ...priceRange };

    if (isMin) {
      if (value <= priceRange.price_max) {
        updatedRange.price_min = value;
      }
    } else {
      if (value >= priceRange.price_min) {
        updatedRange.price_max = value;
      }
    }

    setPriceRange(updatedRange);
    onPriceChange(updatedRange);
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    const sliderRect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - sliderRect.left;
    const sliderWidth = sliderRect.width;

    let clickedValue = Math.round(
      minPrice + (clickPosition / sliderWidth) * (maxPrice - minPrice)
    );

    clickedValue = Math.max(minPrice, Math.min(maxPrice, clickedValue));

    const distanceToMin = Math.abs(clickedValue - priceRange.price_min);
    const distanceToMax = Math.abs(clickedValue - priceRange.price_max);

    if (
      priceRange.price_min === minPrice &&
      clickedValue <= priceRange.price_min
    ) {
      handlePriceChange(
        {
          target: { value: clickedValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>,
        true
      );
    } else if (
      priceRange.price_max === maxPrice &&
      clickedValue >= priceRange.price_max
    ) {
      handlePriceChange(
        {
          target: { value: clickedValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>,
        false
      );
    } else if (
      distanceToMin < distanceToMax ||
      (distanceToMin === distanceToMax && clickedValue <= priceRange.price_min)
    ) {
      handlePriceChange(
        {
          target: { value: clickedValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>,
        true
      );
    } else {
      handlePriceChange(
        {
          target: { value: clickedValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>,
        false
      );
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center"
      onClick={handleSliderClick}
    >
      <div className="relative w-full">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.price_min}
          onChange={(e) => handlePriceChange(e, true)}
          className="absolute w-full h-1 bg-transparent appearance-none z-20"
          style={{ pointerEvents: "auto" }}
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange.price_max}
          onChange={(e) => handlePriceChange(e, false)}
          className="absolute w-full h-1 bg-transparent appearance-none z-20"
          style={{ pointerEvents: "auto" }}
        />
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-1 bg-gray-300"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500"
          style={{
            left: `${
              ((priceRange.price_min - minPrice) / (maxPrice - minPrice)) * 100
            }%`,
            width: `${
              ((priceRange.price_max - priceRange.price_min) /
                (maxPrice - minPrice)) *
              100
            }%`,
          }}
        ></div>
      </div>
      <div className="flex justify-between w-full mt-2 text-sm">
        <span>Min: ${priceRange.price_min}</span>
        <span>Max: ${priceRange.price_max}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
