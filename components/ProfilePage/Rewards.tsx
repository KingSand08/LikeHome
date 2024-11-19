import React, { useState, useEffect } from "react";

const Rewards = () => {
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch reward points
    const fetchPoints = async () => {
      const points = 70; // Replace with actual API call
      setRewardPoints(points);
    };
    fetchPoints();
  }, []);

  const levels: Record<number, string> = {
    0: "Bronze",
    500: "Silver",
    1000: "Gold",
    1500: "Platinum",
  };

  const calculatePointsToNextLevel = (currentPoints: number, levels: Record<number, string>) => {
    const levelsArray = Object.keys(levels).map(Number).sort((a, b) => a - b);
    const nextLevelIndex = levelsArray.findIndex(level => currentPoints < level);

    if (nextLevelIndex === -1) return 0; // Already at the highest level
    return levelsArray[nextLevelIndex] - currentPoints;
  };

  const getRewardLevel = (currentPoints: number): string => {
    return levels[
      Object.keys(levels)
        .map(Number)
        .reverse()
        .find(level => currentPoints >= level)!
    ];
  };

  const pointsToNextLevel = calculatePointsToNextLevel(rewardPoints, levels);
  const level = getRewardLevel(rewardPoints);
  const percentage = pointsToNextLevel
    ? (rewardPoints * 100) / (rewardPoints + pointsToNextLevel)
    : 100;

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl py-7 font-bold">MY POINTS</h2>
      <div className="flex flex-wrap space-x-4">
        {/* Available Points Card */}
        <div
          className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center justify-start py-9 px-8 h-full hover:bg-gray-100"
          style={{ width: "20rem", height: "20rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#4328CF"
            viewBox="0 0 24 24"
            strokeWidth={0.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            {/* SVG Path */}
          </svg>
          <div className="text-lg mb-2 py-3 pt-6">Available Points</div>
          <p className="font-bold text-3xl mb-2">{rewardPoints}</p>
          <p className="text-gray-700 text-base">Total Points</p>
        </div>
        {/* Repeat for other cards */}
      </div>
      <h2 className="text-2xl py-7 font-bold">MY LEVELS</h2>
      {/* Additional JSX */}
    </div>
  );
};

export default Rewards;
