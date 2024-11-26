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

export async function updateUserRewards(email: string, room_cost: number) {
  try {
    const pointsToAdd = room_cost * DEFAULT_REWARDS_MULTIPLIER;

    const updatedRewards = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        rewardPoints: {
          increment: pointsToAdd,
        },
      },
    });

    console.log("Updated rewards:", updatedRewards);
    return updatedRewards;
  } catch (error: any) {
    console.error("Error updating rewards:", error.message);
    throw error;
  }
}
