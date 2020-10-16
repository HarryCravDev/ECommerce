const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  console.log(`Token ID: ${id}`);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
