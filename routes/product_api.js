var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");
const categoriesController = require("../controllers/categories");
const upload = require("../middle/upload");
const authen = require("../middle/authen");
const { validationResult, check } = require("express-validator");

// lấy danh sách sản phẩm
router.get("/", [authen.checkToken], async function (req, res, next) {
  try {
    const products = await productController.get();
    res.json(products);
  } catch (error) {
    console.log("Get product error", error);
  }
});
// lấy thông chi tiết sản phẩm
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const product = await productController.getOneProduct(id);

    res.json(product);
  } catch (error) {
    console.log("Get one product error", error);
  }
});

module.exports = router;
