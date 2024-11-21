import _ from "lodash";
import fastify from "fastify";
import getUsers from "./utils.js";

export default () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.get('/users', async (request) => {
    const { page = 1, per = 5 } = request.query;

    const pageNumber = parseInt(page, 10);
    const perPage = parseInt(per, 10);

    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedUsers = users.slice(startIndex, endIndex);

    return paginatedUsers;
  });
  // END

  return app;
};
