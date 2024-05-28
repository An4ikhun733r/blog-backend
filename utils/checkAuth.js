import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // Use a regular expression literal to replace the "Bearer " prefix
  const token = (req.headers.authorization || "").replace(/^Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "No access",
      });
    }
  } else {
    return res.status(403).json({
      message: "No access",
    });
  }
};
