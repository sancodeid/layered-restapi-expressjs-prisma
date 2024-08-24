const prisma = require("../db");
const {
  findProducts,
  findProductById,
  insertProduct,
  editProduct,
  deleteProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  return product;
};

const createProduct = async (productData) => {
  const product = await insertProduct(productData);

  if (!product) {
    throw Error("failed create products");
  }

  return product;
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  if (!product) {
    throw Error("failed update products");
  }

  const product = await editProduct(id, productData);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  editProductById,
  deleteProductById,
};
