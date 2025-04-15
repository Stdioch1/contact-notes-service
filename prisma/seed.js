const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create contact: John Doe
  const john = await prisma.contact.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-1234',
      notes: {
        create: [
          {
            title: 'Initial meeting',
            body: 'Discussed project requirements and deadlines.',
            createdAt: new Date(),
          },
          {
            title: 'Follow-up call',
            body: 'Talked through API integration details.',
            createdAt: new Date(),
          },
        ],
      },
    },
  });

  // Create contact: Jane Smith
  const jane = await prisma.contact.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '555-5678',
      notes: {
        create: [
          {
            title: 'Intro call',
            body: 'Introduced the company and product.',
            createdAt: new Date(),
          },
        ],
      },
    },
  });

  console.log('✅ Seeded contacts and notes!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());