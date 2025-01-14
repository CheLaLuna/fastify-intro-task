import generateUsers, { decrypt } from "../utils.js";

export default (app) => {
  const users = generateUsers();

  // BEGIN (write your solution here)
  app.get("/sessions/new", async (req, res) => {
    res.view("src/views/sessions/new", { error: null });
  });

  app.post("/sessions", async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);
    const hashedPassword = decrypt(password);

    if (!user || user.password !== hashedPassword) {

      return res.view("src/views/sessions/new", { error: "Wrong username or password" });
    }

    req.session.username = user.username;

    res.redirect("/");
  });

  app.post("/sessions/delete", async (req, res) => {
    req.destroySession(() => {
      res.redirect("/");
    });
  });
  // END
};
