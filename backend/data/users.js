const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Harry Craven",
    email: "HarryCraven@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Admin User",
    email: "AlexanderMills@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

module.exports = users;
