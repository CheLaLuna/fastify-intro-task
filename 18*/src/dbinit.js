export default (db) => {
  // BEGIN (write your solution here)
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL
      )`
    );
  });
  // END
};
