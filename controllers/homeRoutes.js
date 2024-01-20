const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");

//localhost3001 (get request)
router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["comment_body"],
        },
      ],
    });
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//localhost3001/login (any request)
router.all("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
