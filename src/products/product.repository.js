const prisma = require("../db");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      seller: true,
    },
  });
  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      images: productData.images,
      seller: {
        connect: { id: productData.sellerId },
      },
    },
  });
  return product;
};

const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      stock: productData.stock,
      category: productData.category,
      images: productData.images,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });
  return product;
};

module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  editProduct,
  deleteProduct,
};
