const prisma = require("../db");

const findUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      products: true,
    },
  });
  return user;
};

const insertUser = async (userData) => {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      address: userData.address,
    },
  });
  return user;
};

const editUser = async (id, userData) => {
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...userData,
    },
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });
  return user;
};

module.exports = { findUsers, insertUser, editUser, findUserById, deleteUser };
