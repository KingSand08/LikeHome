const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Logging enabled
});

async function main() {
  try {
    console.log('Fetching hotels...');

    // Fetch only _id and name fields
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    console.log('Hotels:', hotels);

    if (hotels.length === 0) {
      console.log('No hotels found in the database.');
    }
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
