import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  await app.register(view, { engine: { pug } });

  app.get('/users', (req, res) => {
    res.view('src/views/users/index.pug', { users });
  });

  app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((item) => item.id === id);
    console.log('Requested ID:', id);
    console.log('Found user:', user);
    if (user) {
      res.view('src/views/users/show.pug', { user });
    } else {
      res.code(404).send('User not found');
    }
  });
  // END

  return app;
};
