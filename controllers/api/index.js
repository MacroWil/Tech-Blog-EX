const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoutes");
const commentRoutes = require("./commentRoutes");
const dashboardRoutes = require("./dashboardsRoutes");

router.use("/users", userRoutes);
router.use("/blogposts", blogPostRoutes);
router.use("/comments", commentRoutes);
//router.use("/dashboard", dashboardRoutes);

module.exports = router;
