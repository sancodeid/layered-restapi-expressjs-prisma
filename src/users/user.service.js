const prisma = require("../db");
const {
  findUsers,
  findUserById,
  insertUser,
  editUser,
  deleteUser,
} = require("./user.repository");

const getAllUsers = async () => {
  const users = await findUsers();
  if (!users) {
    throw Error("Cannot load users data");
  }
  return users;
};

const getUserById = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw Error("Users not found");
  }
  return user;
};

const createUser = async (userData) => {
  const newUser = await insertUser(userData);
  if (!newUser) {
    throw Error("Invalid request: Missing required fields.");
  }
  return newUser;
};

const editUserById = async (id, userData) => {
  await getUserById(id);
  const updateUser = await editUser(id, userData);
  return updateUser;
};

const deleteUserById = async (id) => {
  await getUserById(id);
  await deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUserById,
  deleteUserById,
};
