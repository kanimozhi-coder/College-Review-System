import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    console.log("decoded", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token",
    });
  }
};

export default protect;
