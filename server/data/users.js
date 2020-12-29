import bcrypt from "bcryptjs";

const users = [
  {
    name: "bubu",
    password: bcrypt.hashSync("123456", 10),
    email: "bubu@test.com",
    picture: new Map([
      ["large", "https://randomuser.me/api/portraits/women/12.jpg"],
      ["medium", "https://randomuser.me/api/portraits/med/women/12.jpg"],
      ["thumbnail", "https://randomuser.me/api/portraits/thumb/women/12.jpg"],
    ]),
  },
];

export default users;
