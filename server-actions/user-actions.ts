"use server";
import { auth } from "@/auth";

export async function createUser(id: string, email: string, name: string) {
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
            rewardPoints: 0
        },
    })
}

export async function updatePoints(userId: string, pointChange: number) {
    const oldPoints = await prisma.user.findUnique({
        where: { id: userId },
        select: { points: true },
        });
    
    const points = oldPoints + pointChange;

  return prisma.user.update({
    where: { id: userId },
    data: { points },
});}