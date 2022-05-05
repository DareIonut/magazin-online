import bcryptjs from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Jhon Doe",
    email: "jhon@example.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@example.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default users;
