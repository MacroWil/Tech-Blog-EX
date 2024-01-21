const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { BlogPost, Comment, User } = require("../../models");

//localhost3001/api/blogposts (post request)
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log("New Blog Post Added:", newBlogPost);
    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//localhost3001/api/blogposts/:id (get request)
router.get("/:id", withAuth, async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const blogPost = blogPostData.get({ plain: true });
    console.log(blogPost);
    res.render("blogPost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost3001/api/blogposts/:id (update via put request)
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: "No blog post with this ID" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost3001/api/blogposts/:id (delete request)
router.delete("/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogPostData) {
      res.status(404).json({ message: "No blog post with this ID" });
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
