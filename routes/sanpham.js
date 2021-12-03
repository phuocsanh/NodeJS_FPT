var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");
const categoriesController = require("../controllers/categories");
const upload = require("../middle/upload");
const authen = require("../middle/authen");
const { validationResult, check } = require("express-validator");
/* hiển thị trang danh sách sản phẩm */
router.get("/", [authen.checkLogin], async function (req, res, next) {
  const products = await productController.get();
  const categories = await categoriesController.getAllCategories();

  res.render("san-pham", { products: products, categories: categories });
});

// thực hiện thêm mới sản phẩm
router.post("/", [authen.checkLogin], async function (req, res, next) {
  await check("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Tên sản phẩm phải nhiều hơn 2 kí tự")
    .run(req);

  await check("price")
    .trim()
    .isInt({ min: 1000 })
    .withMessage("Giá sản phẩm không được ít hơn 1000 VND")
    .run(req);

  await check("quantity")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Số lượng không được ít hơn 1")
    .run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ status: false, errors: result.array() });
  } else {
    const { body } = req;
    await productController.insert(body);
    // console.log(body.available);
    res.status(200).json({ status: true });
  }
});

// thực hiện xóa sản phẩm
router.delete("/:id", [authen.checkLogin], async function (req, res, next) {
  const { params } = req;
  await productController.delete(params.id);
  res.json({ result: true });
});

// lấy thông chi tiết sản phẩm
router.get("/:id/edit", [authen.checkLogin], async function (req, res, next) {
  const { id } = req.params;
  const product = await productController.getOneProduct(id);
  const categories = await categoriesController.getAllCategories();
  res.render("chi-tiet-san-pham", { product: product, categories: categories });
});

// sửa thông tin sản phẩm
router.post("/:id/edit", [authen.checkLogin], async function (req, res, next) {
  await check("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Tên sản phẩm phải nhiều hơn 2 kí tự")
    .run(req);

  await check("price")
    .trim()
    .isInt({ min: 1000 })
    .withMessage("Giá sản phẩm không được ít hơn 1000 VND")
    .run(req);

  await check("quantity")
    .trim()
    .isInt({ min: 1 })
    .withMessage("Số lượng không được ít hơn 1")
    .run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
    res.status(400).json({ status: false, errors: result.array() });
  } else {
    let { params, body } = req;
    body = { ...body, id: params.id };

    await productController.update(body);
    // res.redirect("/sanpham");
    // console.log(body.available);
    res.status(200).json({ status: true });
  }
});

module.exports = router;
