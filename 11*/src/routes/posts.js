import _ from "lodash";
import generatePosts from "../utils.js";

export default (app) => {
  const posts = generatePosts();

  // BEGIN (write your solution here)
  app.get("/posts/:id", { name: "post" }, (req, res) => {
    const postId = req.params.id;
    const post = posts.find((p) => p.id === postId);
  
    if (!post) {
      return res.status(404).send("Page not found");
    }
  
    res.view("src/views/posts/show", { post });
  });
  
  app.get("/posts", { name: "posts" }, (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = 5;
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);
  
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPosts = posts.slice(startIndex, endIndex);
  
    res.view("src/views/posts/index", {
      posts: currentPosts,
      currentPage,
      totalPages,
      route: (name, params) => {
        if (name === 'post' && params.id) {
          return `/posts/${params.id}`;
        }
        return '/posts';
      }
    });
  });
  // END
};
