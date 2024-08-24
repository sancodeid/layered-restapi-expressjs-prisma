const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  editProductById,
  deleteProductById,
} = require("./product.service");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await getProductById(productId);
  res.send(product);
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const product = await createProduct(newProduct);
    res.status(201).send({
      data: product,
      message: "Created product succesfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const productData = req.body;

    const product = await editProductById(productId, productData);

    if (
      !(
        productData.name &&
        productData.description &&
        productData.price &&
        productData.stock &&
        productData.category &&
        productData.images
      )
    ) {
      return res.status(400).send("Field not complete");
    }
    res.status(201).send({
      data: product,
      message: "Product succesfully updated",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const newProduct = req.body;
    const product = await editProductById(productId, newProduct);
    res.status(200).send({
      data: product,
      message: "Product field succesfully updated",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await deleteProductById(productId);
  res.status(200).send("Product succesfully deleted");
});

module.exports = router;
