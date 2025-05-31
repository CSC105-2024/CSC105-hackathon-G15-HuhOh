import db from "../lib/db.ts";
import { hash, compare } from "bcryptjs";

const findByEmail = async (email: string) => {
  const mail = await db.user.findUnique({
    where: { email },
  });
  return mail;
};

const findByUsername = async (username: string) => {
  const account = await db.user.findUnique({
    where: { username },
  });
  return account;
};

const findById = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
  });
  return user;
};

const getUserInfo = async (id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      username: true,
      profilePic: true,
    },
  });
  return user;
};

const validatePassword = async (input: string, hash: string) => {
  return compare(input, hash);
};

const createUser = async (
  userName: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hash(password, 10);
  const user = await db.user.create({
    data: {
      username: userName,
      email: email,
      password: hashedPassword,
    },
  });
  return user;
};

const updateUser = async (
  userId: string,
  data: { username?: string; profilePic?: string; password?: string }
) => {
  const updateData: any = {};

  if (data.username) {
    updateData.username = data.username;
  }

  if (data.profilePic) {
    updateData.profilePic = data.profilePic;
  }

  if (data.password) {
    updateData.password = await hash(data.password, 10);
  }

  const user = await db.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      username: true,
      profilePic: true,
      password: true,
    },
  });

  return user;
};

export {
  findByEmail,
  findByUsername,
  findById,
  getUserInfo,
  createUser,
  updateUser,
  validatePassword,
};
