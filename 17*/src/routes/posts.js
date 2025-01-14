import generateId from "../utils.js";

export default (app) => {
  const posts = [];

  app.get("/posts/new", (req, res) => res.view("src/views/posts/new"));

  app.get("/posts/:id", (req, res) => {
    const post = posts.find(({ id }) => id === req.params.id);
  
    if (!post) {
      res.status(404).send("Post not found");
      return;
    }
  
    res.render("src/views/posts/show", { post });
  });
  
  app.get("/posts", (req, res) => {
    const data = {
      posts,
    };
  
    res.render("src/views/posts/index", data);
  });

  app.post("/posts", (req, res) => {
    if (!req.body.title || req.body.title.length < 2) {
      req.flash("warning", "Ошибка создания поста!");
      res.redirect("/posts");
      return;
    }
    const post = {
      title: req.body.title,
      body: req.body.body,
      id: generateId(),
    };

    posts.push(post);

    req.flash("success", "Пост был успешно создан!");

    res.redirect("/posts");
  });
};
