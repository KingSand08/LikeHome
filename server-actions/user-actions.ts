"use server";

import prisma from "@/prisma/client";

export async function createUser(email: string, name: string) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return existingUser;
    }

    return await prisma.user.create({
      data: {
        name,
        email,
        rewardPoints: 0,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function updatePoints(userId: string, pointChange: number) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { rewardPoints: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedPoints = (user.rewardPoints ?? 0) + pointChange;

    return await prisma.user.update({
      where: { id: userId },
      data: { rewardPoints: updatedPoints },
    });
  } catch (error) {
    console.error("Error updating points:", error);
    throw new Error("Failed to update user points");
  }
}

export async function getUserByEmail(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required to fetch a user.");
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { reservations: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    throw new Error("Failed to retrieve user by email");
  }
}
