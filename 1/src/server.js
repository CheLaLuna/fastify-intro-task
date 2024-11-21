import fastify from "fastify";

export default () => {
  const app = fastify();
  // BEGIN (write your solution here)
  app.get('/', async () => {
    return 'Welcome to Fastify!';
  });
  // END
  return app;
};
