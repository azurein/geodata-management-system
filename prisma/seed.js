const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create sample users
  await prisma.user.createMany({
    data: [
      { name: 'Robin', email: 'robin@example.com', password: '$2y$10$LkoR0twjOWxYVNdLJmpQkOyg3qguyTzKod.eMriiwNi59eGDzg6qW' },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
