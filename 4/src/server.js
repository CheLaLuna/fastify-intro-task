import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', async (request, reply) => {
    const { id } = request.params;

    const company = companies.find(company => company.id === id);

    if (company) {
      return company;
    } else {
      reply.status(404).send('Company not found');
    }
  });
  // END

  return app;
};
