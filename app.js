// Thư viện
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const hbs = require("hbs");

require("dotenv").config();
const session = require("express-session");
const mongoose = require("mongoose");
require("./models/userModel");
require("./models/productModel");
require("./models/categoryModel");

//khởi tạo app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: process.env.JWT_SECRET_KEY,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
mongoose
    .connect(process.env.MONGODB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Conected"))
    .catch((err) => console.log("DB error", err));

app.use(cors());
//Tự tạo hàm tăng số thứ tự của HBS
hbs.registerHelper("soThuTu", function(a, b) {
    return a + 1;
});

hbs.registerHelper("formatDate", function(a, type, b) {
    let date = new Date(a);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    month = month.toString().length === 1 ? "0" + month : month;
    let day =
        date.getDate().toString().length === 1 ?
        "0" + date.getDate().toString() :
        date.getDate().toString();
    if (type == 1) return `${day}-${month}-${year}`;

    return `${year}-${month}-${day}`;
});

hbs.registerHelper("getCategoryName", (id, categories, b) => {
    const category = categories.filter(
        (c) => c._id.toString() === id.toString()
    )[0];
    // console.log(categories, "categoiries111");
    // console.log(id, "id category");
    return category.name;
});
hbs.registerHelper("compareCategories", function(_id, id, b) {
    return _id.toString() === id.toString();
});
// chuyển hướng
//http://localhost:3000
var indexRouter = require("./routes/dangnhap");

var sanPhamRouter = require("./routes/sanpham");
var danhMucRouter = require("./routes/danhmuc");
var thongKeRouter = require("./routes/thongke");
var indexAPIRouter = require("./routes/index_api");
var productAPIRouter = require("./routes/product_api");

// const { getAllCategories } = require("./services/categories");

app.use("/", indexRouter);
app.use("/sanpham", sanPhamRouter);
app.use("/danhmuc", danhMucRouter);
app.use("/thongke", thongKeRouter);
app.use("/api-index", indexAPIRouter);
app.use("/api-product", productAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;