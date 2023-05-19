const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization failed" });
    }

    const decodedToken = jwt.verify(token, "secret");
    req.userData = {
      userId: decodedToken.userId,
      adminId: decodedToken.adminId,
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization failed" });
  }
};

module.exports = authMiddleware;
