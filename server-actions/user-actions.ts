"use server";
import { auth } from "@/auth";

async function addUser(userId: string) {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    
    return prisma.user.create({
        data: {
            name: session.user.name,
            email: session.user.email,
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