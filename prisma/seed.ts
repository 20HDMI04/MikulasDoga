import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
const prisma = new PrismaClient();

console.log('Seeding...');
dotenv.config();
async function main() {
  for (let i = 0; i < 10; i++) {
    await prisma.children.create({
      data: {
        name: faker.person.fullName(),
        goodKid: faker.datatype.boolean(),
        address: faker.location.streetAddress({ useFullAddress: true }),
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    await prisma.games.create({
      data: {
        name: faker.commerce.productName(),
        material: faker.helpers.enumValue(
          require('../generated/prisma/enums').Material,
        ),
        weight: faker.number.int({ min: 100, max: 5000 }),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
