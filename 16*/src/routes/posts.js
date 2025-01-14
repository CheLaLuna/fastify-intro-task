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
    res.view("src/views/posts/show", { post });
  });

  // BEGIN (write your solution here)
  app.post("/posts", (req, res) => {
    const { title, body } = req.body;

    if (!title || title.length < 2) {
      req.flash('error', 'Ошибка создания поста!');
      return res.redirect('/posts/new');
    }

    const newPost = {
      title,
      body,
      id: generateId(),
    };

    posts.push(newPost);

    req.flash('success', 'Пост был успешно создан!');
    res.redirect('/posts');
  });

  app.get("/posts", (req, res) => {
    const flashMessages = {
      success: req.flash('success'),
      error: req.flash('error'),
    };
    res.view("src/views/posts/index", { posts, flashMessages });
  });
  // END
};
