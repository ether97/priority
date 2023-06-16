import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

import bcrypt, { hash } from "bcrypt";

import { prisma } from "../src/server/db";

export enum Priority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export interface Deadline {
  userId: string;
  title: string;
  description?: string;
  priority: Priority;
  date: Date;
}

async function main() {
  // const hashedPassword = await bcrypt.hash("Matt123$", 12);
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Matt",
  //     email: "matt@gmail.com",
  //     hashedPassword,
  //   },
  // });
  // const data = Array.from({ length: 100 }, () => ({
  //   userId: user.id,
  //   title: faker.lorem.words({ min: 1, max: 5 }),
  //   description: faker.lorem.words({ min: 3, max: 30 }),
  //   date: faker.date.future({ years: 1 }),
  //   priority: faker.helpers.enumValue(Priority),
  // }));
  // await prisma.deadline.createMany({
  //   data,
  // });
  await prisma.deadline.deleteMany({});
}

main()
  .then(async () => {
    console.log("seeded!");
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
