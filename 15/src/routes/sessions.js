import generateUsers, { decrypt } from "../utils.js";

export default (app) => {
  const users = generateUsers();

  // BEGIN (write your solution here)
  app.get("/sessions/new", (req, res) => {
    const errorMessage = req.query.error ? "Wrong username or password" : null;
    res.view("src/views/sessions/new", { errorMessage });
  });

  app.post("/sessions", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && decrypt(user.password) === password) {
      req.session.userId = user.id;
      return res.redirect("/");
    }

    res.redirect("/sessions/new?error=true");
  });

  app.post("/sessions/delete", (req, res) => {
    delete req.session.userId;
    res.redirect("/");
  });
  // END
};
