import bcrypt from "bcryptjs";

const users = [
  {
    name: "bubu",
    password: bcrypt.hashSync("123456", 10),
    email: "bubu@test.com",
  },
];

export default users;
