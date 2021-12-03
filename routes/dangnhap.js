var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const authen = require("../middle/authen");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");
// kiem tra dang nhap
router.get("/", [authen.checkLogin], function(req, res, next) {
    res.redirect("sanpham");
});
/* hiện trang đăng nhập */
router.get("/dangnhap", function(req, res, next) {
    res.render("dang-nhap", { err: null });
});

// Thực hiện đăng nhập
router.post("/dangnhap", async function(req, res, next) {
    const { body } = req;
    const checkLogin = await userController.login(body.username, body.password);

    await check("username")
        .isEmail()
        .withMessage("Tên đăng nhập không phải email")
        .run(req);
    //check password
    await check("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password không đủ 6 kí tự")
        .bail()
        .not()
        .isIn(["123", "password"])
        .withMessage("password không hợp lệ")
        .bail()
        .matches(/\d/)
        .matches(/\D/)
        .withMessage("password phải có chữ và số")

    .run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ status: false, errors: result.array() });
        // res.render("dang-nhap", { errorUsername: result });
    } else {
        // res.json({ status: true });
        if (checkLogin) {
            const token = jwt.sign({
                    id: checkLogin.id,
                    username: checkLogin.username,
                },
                process.env.JWT_SECRET_KEY
            );
            req.session.token = token;
            // res.redirect("/sanpham");
            res.status(200).json({ status: true });
        } else {
            // res.render("dang-nhap", { err: "error username or password" });
            res
                .status(400)
                .json({ status: false, errors: "Sai username hoặc password" });
        }
    }
});
// thực hiện đăng xuất
router.get("/dangxuat", function(req, res, next) {
    req.session.destroy(function(error) {
        res.redirect("/");
    });
});
//hiển thị trang đang kí
router.get("/dangki", function(req, res, next) {
    res.render("dang-ki");
});

// thực hiện đăng kí
router.post("/dangki", async function(req, res, next) {
    const { username, password, confirm_password } = req.body;
    const user = await userController.register(
        username,
        password,
        confirm_password
    );
    if (user) {
        res.redirect("/dangnhap");
    } else {
        res.redirect("/dangki");
    }
});
router.get("/hinhchunhat/:canh_day/:chieu_cao", function(req, res, next) {
    const {
        params: { canh_day, chieu_cao },
    } = req;
    const dienTich = canh_day * chieu_cao;
    const chuVi = 2 * (Number(canh_day) + Number(chieu_cao));

    res.render("hinhvuong", { chuVi: chuVi, dienTich: dienTich });
    //res.status(200).json({ chuVi: chuVi }); // In ra json
});
// test express-validator
router.post("/test-validator", async function(req, res, next) {
    //check email
    await check("username")
        .isEmail()
        .withMessage("Tên đăng nhập không phải email")
        .run(req);
    //check password
    await check("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password không đủ 6 kí tự")
        .bail()
        .not()
        .isIn(["1234", "password"])
        .withMessage("password không hợp lệ")
        .bail()
        .matches(/\d/)
        .withMessage("password phải có số")
        .run(req);
    // Check confirm password
    await check("confirmPassword")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password không trùng khớp");
            }
            return true;
        })
        .run(req);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ status: false, error: result.array() });
    } else {
        res.json({ status: true });
    }
});

module.exports = router;