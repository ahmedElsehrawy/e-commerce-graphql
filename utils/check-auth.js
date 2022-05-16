const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const { SECRET_FOR_JWT } = require("../config.js");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_FOR_JWT);

        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error("Autherization header must be provided");
};
