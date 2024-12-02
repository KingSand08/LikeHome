"use client";
import { getUserRewards } from "@/server-actions/user-actions";
import User from "@/types/User";
import React, { use, useEffect, useState } from "react";
import NumberTicker from "../ui/number-ticker";
import { RewardRibbon, Sparkle, Sparkles } from "../svg";

const Rewards = ({ user }: { user: User }) => {
  if (!user.email) {
    throw new Error("User email not found");
  }
  const [rewards, setRewards] = useState({
    rewardPoints: 0,
    redeemedPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserRewards(user.email!).then((rewards) => {
      setRewards(rewards);
      setLoading(false);
    });
  }, [user.email]);

  const levels: Record<string, string> = {
    150: "Bronze",
    500: "Silver",
    1000: "Gold",
    1500: "Platinum",
  };

  const getRewardLevel = (points: number): string => {
    if (points < 150) return "Almost there!...";
    if (points < 550) return "Bronze";
    if (points < 1000) return "Silver";
    if (points < 1500) return "Gold";
    return "Platinum";
  };

  const calculatePointsToNextLevel = (
    points: number,
    levels: Record<string, string>
  ) => {
    const levelThresholds = Object.keys(levels)
      .map(Number)
      .sort((a, b) => a - b);
    const nextLevel = levelThresholds.find((threshold) => points < threshold);
    return nextLevel ? nextLevel - points : 0; // Return 0 if at the highest level
  };

  const getNextLevel = (points: number, levels: Record<string, string>) => {
    const levelThresholds = Object.keys(levels)
      .map(Number)
      .sort((a, b) => a - b);
    const nextLevel = levelThresholds.find((threshold) => points < threshold);
    return nextLevel ? levels[nextLevel.toString()] : "Platinum"; // Default to highest level
  };

  const currentLevel = getRewardLevel(rewards.rewardPoints);
  const pointsToNextLevel = calculatePointsToNextLevel(
    rewards.rewardPoints,
    levels
  );
  const nextLevel = getNextLevel(rewards.rewardPoints, levels);
  const percentage =
    (rewards.rewardPoints / (rewards.rewardPoints + pointsToNextLevel)) * 100;

  const badgeColor: string =
    {
      "Almost there!...": "#4328CF",
      Bronze: "#986634",
      Silver: "#636363",
      Gold: "#BFA100",
      Platinum: "#5a7490",
    }[currentLevel] ?? "#4328CF";

  return (
    <div className="h-full p-6 text-gray-900 dark:text-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-6">My Rewards</h2>

      {/* Reward Points Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg shadow-md p-6 flex flex-col items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Sparkle />
          <h3 className="text-xl font-semibold mb-2">Available Points</h3>
          {rewards.rewardPoints > 0 ? (
            <NumberTicker
              className="text-3xl font-bold animate-text-pulse"
              value={rewards.rewardPoints}
            />
          ) : (
            <p className="text-3xl font-bold">{rewards.rewardPoints}</p>
          )}
          <p className="text-gray-500">Total Points</p>
        </div>

        <div className="rounded-lg shadow-md p-6 flex flex-col items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Sparkles />
          <h3 className="text-xl font-semibold mb-2">Redeemed Points</h3>
          {rewards.redeemedPoints > 0 ? (
            <NumberTicker
              className="text-3xl font-bold"
              value={rewards.redeemedPoints}
            />
          ) : (
            <p className="text-3xl font-bold">{rewards.redeemedPoints}</p>
          )}
        </div>
      </div>

      {/* Levels Section */}
      <h2 className="text-3xl font-bold mt-8 mb-6">My Levels</h2>
      <div className="rounded-lg shadow-md p-6 bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Current Level</h3>
        <div className="flex items-center justify-center mb-4">
          <div className="flex flex-col space-y-5 py-5 rounded-xl items-center w-full dark:bg-gray-900 dark:bg-opacity-60 light:bg-slate-300 light:bg-opacity-60">
            <div className="relative flex flex-col items-center">
              <RewardRibbon badgeColor={badgeColor} />
            </div>
            <span
              className="px-4 py-2 rounded-lg text-white font-bold"
              style={{ backgroundColor: badgeColor }}
            >
              {currentLevel}
            </span>
          </div>
        </div>
        <p className="mb-2">
          <strong>{pointsToNextLevel} points</strong> more needed to unlock the
          next level: <strong>{nextLevel}</strong>
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>{rewards.rewardPoints} Points</span>
          <span>{nextLevel}</span>
        </div>
      </div>
      {/* How Reward Points Work Section */}
      <h2 className="text-3xl font-bold mt-8 mb-6">How Reward Points Work</h2>
      <div className="rounded-lg shadow-md p-6 flex flex-col items-center bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700">
        <p className="mb-2">Earn reward points every time you book a stay with us! For every $10 you spend, you&lsquo;ll earn 
          1 point. Once you&lsquo;ve accumulated enough points, you can redeem them for a free stay. At checkout, simply 
          choose the redeem rewards option and your points will be applied towards your next booking.
        </p>
      </div>
    </div>
  );
};

export default Rewards;
