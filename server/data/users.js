import bcrypt from "bcryptjs";

const users = [
  {
    name: "Bruce",
    password: bcrypt.hashSync("123456", 10),
    email: "bruce@test.com",
    picture: new Map([
      ["large", "https://randomuser.me/api/portraits/men/12.jpg"],
      ["medium", "https://randomuser.me/api/portraits/med/men/12.jpg"],
      ["thumbnail", "https://randomuser.me/api/portraits/thumb/men/12.jpg"],
    ]),
  },
  {
    name: "John",
    password: bcrypt.hashSync("123456", 10),
    email: "john@test.com",
    picture: new Map([
      ["large", "https://randomuser.me/api/portraits/men/20.jpg"],
      ["medium", "https://randomuser.me/api/portraits/med/men/20.jpg"],
      ["thumbnail", "https://randomuser.me/api/portraits/thumb/men/20.jpg"],
    ]),
  },
];

export default users;
