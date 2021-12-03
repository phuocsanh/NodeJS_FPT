var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

const jwt = require("jsonwebtoken");
const { validationResult, check } = require("express-validator");

//thực hiện đăng kí
router.post("/dangki", async function (req, res, next) {
  const { username, password, confirm_password } = req.body;
  const user = await userController.register(
    username,
    password,
    confirm_password
  );
  if (user) {
    res.json({ status: true, user });
  } else {
    res.json({ status: false, user });
  }
});

//thực hiện đăng nhập
router.post("/dangnhap", async function (req, res, next) {
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
      const token = jwt.sign(
        {
          id: checkLogin.id,
          username: checkLogin.username,
        },
        "123"
      );

      // res.redirect("/sanpham");
      res.json({ status: true, user: checkLogin, token });
    } else {
      // res.render("dang-nhap", { err: "error username or password" });
      res.json({ status: false, errors: "Sai username hoặc password" });
    }
  }
});
// thực hiện đăng kí
router.post("/dangki", async function (req, res, next) {
  const { body } = req;

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
    res.json({ status: false, errors: result.array() });
  } else {
    const user = await userController.register(
      body.username,
      body.password,
      body.confirm_password
    );
    if (user) {
      res.json({ status: true });
    } else {
      res.json({ status: false });
    }
  }
});
// thực hiện đăng xuất
router.post("/dangxuat", function (req, res, next) {
  req.session.destroy(function (error) {
    if (error) {
      res.json({ status: false });
    } else {
      res.json({ status: true });
    }
  });
});
module.exports = router;
