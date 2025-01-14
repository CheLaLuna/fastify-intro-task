import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import sqlite3 from "sqlite3";

import addRoutes from "./routes/index.js";
import prepareDatabase from "./dbinit.js";

export default async () => {
  const app = fastify();
  const db = new sqlite3.Database(":memory:");
  prepareDatabase(db);

  await app.register(view, {
    engine: { pug },
  });
  await app.register(formbody);

  app.get("/", (req, res) => {
    res.view("src/views/index");
  });

  addRoutes(app, db);

  return app;
};
