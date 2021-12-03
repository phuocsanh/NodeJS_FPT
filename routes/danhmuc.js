var express = require("express");
var router = express.Router();
const categoriesController = require("../controllers/categories");
const authen = require("../middle/authen");
const { validationResult, check } = require("express-validator");
/* hiển thị trang danh sách categories */
router.get("/", [authen.checkLogin], async function(req, res, next) {
    const categories = await categoriesController.getAllCategories();
    res.render("danh-muc", { categories: categories });
});

// thực hiện thêm mới category
router.post("/", [authen.checkLogin], async function(req, res, next) {
    await check("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Tên danh mục phải nhiều hơn 2 kí tự")
        .run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ status: false, errors: result.array() });
    } else {
        const { body } = req;
        await categoriesController.insert(body);
        // console.log(body.available);
        // console.log(body.available);
        res.status(200).json({ status: true });
    }
});

// thực hiện xóa categories
router.delete("/:id", async function(req, res, next) {
    const { params } = req;
    await categoriesController.delete(params.id);
    res.json({ result: true });
});

// lấy thông chi tiết category
router.get("/:id/edit", async function(req, res, next) {
    const { id } = req.params;

    const category = await categoriesController.getOneCategory(id);
    res.render("chi-tiet-danh-muc", { category: category });
});

// sửa thông tin category
router.post("/:id/edit", async function(req, res, next) {
    let { params, body } = req;

    await check("name")
        .trim()
        .isLength({ min: 3 })
        .withMessage("Tên danh mục phải nhiều hơn 2 kí tự")
        .run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ status: false, errors: result.array() });
    } else {
        body = {...body, id: params.id };
        // console.log(body);
        await categoriesController.update(body);

        res.status(200).json({ status: true });
    }
});

module.exports = router;