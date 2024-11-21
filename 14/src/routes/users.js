import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;

    const id = generateId();
    const token = generateToken();
    const newUser = { id, firstName, lastName, email, token };

    users.push(newUser);

    res.setCookie('token', token, { httpOnly: true });

    res.redirect(/users/`${id}`);
  });

  app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);

    if (user && req.cookies.token === user.token) {
      res.view("src/views/users/show", { user });
    } else {
      res.send("User not found");
    }
  });
  // END
};
