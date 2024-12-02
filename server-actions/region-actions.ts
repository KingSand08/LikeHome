"use server";

import prisma from "@/prisma/client";

export async function getCachedRegions() {
  const regions = await prisma.region.findMany();
  return regions;
}
