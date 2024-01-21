const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { BlogPost, Comment, User } = require("../../models");

//localhost3001/api/comments(post request)
router.post("/", async (req, res) => {
  try {
    console.log("we made it");
    if (req.session.logged_in) {
      const comment = await Comment.create({
        comment_body: req.body.comment_body,
        blogPost_id: req.body.blogPost_id,
        user_id: req.session.user_id || req.body.user_id,
      });
      res.status(200).json(comment);
    } else {
      res.status(123).json(err);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

//localhost3001/api/comments(get request)
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: BlogPost,
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost3001/api/comments/:id (delete request)
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "No comment with that ID" });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
