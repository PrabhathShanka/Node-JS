const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, resp, next) {
  // console.log(req.headers.authorization);
  // next();

  const authorizeHeader = req.headers.authorization;
  if (!authorizeHeader) {
    return resp.status(401).json({
      status: false,
      message: "not token provided",
    });
  }
  if (!authorizeHeader.startsWith("Bearer ")) {
    return resp.status(401).json({
      status: false,
      message: "invalid token",
    });
  }
  const token = authorizeHeader.slice(7);
  if (!token) {
    return resp.status(401).json({
      status: false,
      message: "invalid token",
    });
  }
  try {
    const decodedData = jsonwebtoken.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    return resp.status(401).json({
      status: false,
      message: "invalid token",
    });
  }
}

module.exports = verifyToken;
