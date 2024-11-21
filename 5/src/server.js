import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.register(view, {
    engine: {
      pug,
    },
  });

  app.get('/users', async (request, reply) => {
    return reply.view('/src/views/users/index.pug', { users });
  });

  app.get('/users/:id', async (request, reply) => {
    const userId = request.params.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return reply.code(404).send('User not found');
    }

    return reply.view('/src/views/users/show.pug', { user });
  });
  // END

  return app;
};
