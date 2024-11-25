"use server";
import prisma from "@/prisma/client";

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

export async function updatePoints(email: string, pointChange: number) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { rewardPoints: true },
  });

  if (!user) {
    throw new Error("User not found");
  }
  const oldPoints = user.rewardPoints;

  const rewardPoints = oldPoints ?? 0 + pointChange;

  return prisma.user.update({
    where: { email },
    data: { rewardPoints },
  });
}
