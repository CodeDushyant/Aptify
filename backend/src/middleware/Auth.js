const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
      const token =
      req.body.token ||
      req.cookies?.token ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token is ",token)
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      console.log("Decoded user:", decoded);
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in auth middleware",
    });
  }
};

// Role-based middlewares
exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Students only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role check failed" });
  }
};

exports.isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "SAdmin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Super Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role check failed" });
  }
};

exports.isDesignAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "DAdmin") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Design Admins only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Role check failed" });
  }
};
