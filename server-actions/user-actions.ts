"use server";
import prisma from "@/prisma/client";

// Rewards
const DEFAULT_REWARDS_MULTIPLIER: number = 0.1 as const;

export async function createUser(email: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return existingUser;
  }

  return await prisma.user.create({
    data: {
      email,
      rewardPoints: 0,
    },
  });
}

export async function getUserRewards(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.rewardPoints;
}

export async function updateUserRewards(email: string, payment: number) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const oldPoints = user.rewardPoints;

  const rewardPoints = oldPoints ?? 0 + payment * DEFAULT_REWARDS_MULTIPLIER;

  return prisma.user.update({
    where: { email },
    data: { rewardPoints },
  });
}

export async function redeemRewards(email: string, points: number) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const rewardPoints = user.rewardPoints - points;

  if (rewardPoints < 0) {
    throw new Error("Not enough points to redeem");
  }

  return prisma.user.update({
    where: { email },
    data: {
      rewardPoints,
      redeemedPoints: {
        increment: points,
      },
    },
  });
}
