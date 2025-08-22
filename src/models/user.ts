import { prisma } from "../config/prismaClient";

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

export const createSignUpUser = async (email: string, passwordHash: string) => {
  return prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
    select: { id: true, email: true }
  });
};