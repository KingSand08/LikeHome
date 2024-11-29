"use server";

export async function getCachedRegions() {
  const regions = await prisma.region.findMany();
  return regions;
}
