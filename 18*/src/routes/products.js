export default (app, db) => {
  app.get("/products/new", (req, res) => {
    res.view("src/views/products/new");
  });

  // BEGIN (write your solution here)
  app.post("/products", (req, res) => {
    const { title, description, price } = req.body;
    
    db.run(
      `INSERT INTO products (title, description, price) VALUES (?, ?, ?)`,
      [title, description, price],
      function (err) {
        if (err) {
          return res.status(500).send("Ошибка при добавлении товара");
        }
        res.redirect("/products");
      }
    );
  });

  app.get("/products", (req, res) => {
    db.all(`SELECT * FROM products`, [], (err, products) => {
      if (err) {
        return res.status(500).send("Ошибка при получении товаров");
      }
      res.view("src/views/products/index", { products });
    });
  });

  app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    
    db.get(`SELECT * FROM products WHERE id = ?`, [id], (err, product) => {
      if (err || !product) {
        return res.status(404).send("Товар не найден");
      }
      res.view("src/views/products/show", { product });
    });
  });
  // END
};
