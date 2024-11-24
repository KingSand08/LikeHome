"use server";

import prisma from "../lib/prisma";

export async function createUser(email: string, name: string) {
  // check if user already exists
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) {
    return user;
  }

  return prisma.user.create({
    data: {
      name,
      email,
      rewardPoints: 0,
    },
  });
}

export async function updatePoints(userId: string, pointChange: number) {
  const oldPoints = (
    await prisma.user.findUnique({
      where: { id: userId },
    })
  )?.rewardPoints;

  const rewardPoints = oldPoints ?? 0 + pointChange;

  return prisma.user.update({
    where: { id: userId },
    data: { rewardPoints },
  });
}
