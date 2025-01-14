import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import formbody from "@fastify/formbody";
import getUsers, { generateId, crypto } from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  await app.register(view, { engine: { pug } });
  await app.register(formbody);

  app.get("/", (req, res) => res.view("src/views/index"));

  app.get("/users", (req, res) => {
    const { term } = req.query;
    let currentUsers = users;

    if (term) {
      currentUsers = users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
    }
    res.view("src/views/users/index", { users: currentUsers });
  });

  // BEGIN (write your solution here)
  app.get("/users/new", (req, res) => {
    res.view("src/views/users/new");
  });
  
  app.post("/users", async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    // Проверка на обязательные поля
    if (!username || !email || !password || !passwordConfirm) {
      return res.status(400).send("Все поля обязательны");
    }

    // Нормализация имени пользователя и почтового адреса
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Проверка на совпадение паролей
    if (password !== passwordConfirm) {
      return res.status(400).send("Пароли не совпадают");
    }

    // Проверка на уникальность имени пользователя и email
    const userExists = users.some(user => 
      user.username === normalizedUsername || user.email === normalizedEmail
    );
    
    if (userExists) {
      return res.status(400).send("Пользователь с таким именем или почтой уже существует");
    }

    // Шифрование пароля
    const hashedPassword = crypto(password); // Предполагается, что crypto - это функция для хеширования пароля

    // Создание нового пользователя
    const newUser = {
      id: generateId(),
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    };

    // Добавляем пользователя в список
    users.push(newUser);

    // Редирект на список пользователей
    res.redirect("/users");
  });
  // END

  app.get("/users/:id", (req, res) => {
    const user = users.find(({ id }) => id === req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.view("src/views/users/show", { user });
  });

  return app;
};
