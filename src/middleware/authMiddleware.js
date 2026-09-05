const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized. Invalid token",
    });
  }
};

module.exports = protect;
