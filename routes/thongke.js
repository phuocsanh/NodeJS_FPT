var express = require("express");
var router = express.Router();

/* hiển thị trang danh sách sản phẩm */
router.get("/", function (req, res, next) {
  res.render("thong-ke");
});

module.exports = router;
