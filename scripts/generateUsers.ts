import mongoose, { Types } from "mongoose";
import { faker } from "@faker-js/faker";
import userRepository from "../src/repositories/user.repository";
import accountRepository from "../src/repositories/account.repository";
import { generateAccountNumber } from "../src/utilities/generate-account";
import { CreateUserDTO } from "../src/dto/create-user.dto";

async function generateTestData() {
  // 1. Create users
  const roles = ["Admin", "Manager", "Agent", "Viewer"];
  const users: CreateUserDTO[] = [];

  for (let i = 0; i < 20; i++) {
    users.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: "Password@123",
      role: roles[i % roles.length] as CreateUserDTO["role"],
    });
  }

  const createdUsers = await userRepository.createManyUser(users);

  if (!createdUsers || !createdUsers.length) {
    throw new Error("No users were created.");
  }

  // 2. Create accounts linked to Admin/Manager
  const creators = createdUsers.filter(
    (u: any) => u.role === "Admin" || u.role === "Manager"
  );

  const accounts = [];
  for (let i = 0; i < 100000; i++) {
    const creator = creators[i % creators.length];
    accounts.push({
      accountNumber: generateAccountNumber(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
      createdBy: creator._id as Types.ObjectId,
    });
  }

  const BATCH_SIZE = 5000;
  for (let i = 0; i < accounts.length; i += BATCH_SIZE) {
    const batch = accounts.slice(i, i + BATCH_SIZE);
    await accountRepository.createMany(batch);
    console.log(`Inserted batch ${i / BATCH_SIZE + 1}`);
  }
}

mongoose.connect(process.env.MONGO_URI!).then(async () => {
  await generateTestData();
  mongoose.disconnect();
});
