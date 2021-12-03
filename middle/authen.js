const e = require("cors");
const jwt = require("jsonwebtoken");
exports.checkLogin = (req, res, next) => {
  const { session } = req;
  if (session) {
    const { token } = session;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
          res.redirect("/dangnhap");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/dangnhap");
    }
  } else {
    res.redirect("/dangnhap");
  }
};
exports.checkToken = (req, res, next) => {
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if(token){
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
        if (err) {
          res.json({status: false});
        } else {
          next();
        }
      });
  }else{
      res.json({status: false});
  }
};
