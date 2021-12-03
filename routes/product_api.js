var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");
const categoriesController = require("../controllers/categories");
const upload = require("../middle/upload");
const authen = require("../middle/authen");
const { validationResult, check } = require("express-validator");

// lấy danh sách sản phẩm
router.get("/", [authen.checkToken], async function (req, res, next) {
  const products = await productController.get();
  //   const categories = await categoriesController.getAllCategories();

  res.json(products);
});
// lấy thông chi tiết sản phẩm
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getOneProduct(id);

  res.json(product);
});

module.exports = router;
