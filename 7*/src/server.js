import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  await app.register(view, { engine: { pug } });

  app.get("/", (req, res) => res.view("src/views/index.pug"));

  // BEGIN (write your solution here)
  app.get("/users", (req, res) => {
    try {
      const { term = "" } = req.query;
      const normalizedTerm = term.toLowerCase();

      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(normalizedTerm)
      );

      return res.view("src/views/users/index.pug", { users: filteredUsers, term });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  });
  // END

  app.get("/users/:id", (req, res) => {
    const user = users.find(({ id }) => id === req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.view("src/views/users/show.pug", { user });
  });

  return app;
};
