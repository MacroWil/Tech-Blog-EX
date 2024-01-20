const router = require("express").Router();
const { User } = require("../../models");

//localhost3001/api/users/ (post request)
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//localhost3001/api/users/login (post request)
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      console.log("User not found");
      res.status(400).json({ message: "Incorrect email or password..." });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      console.log("no password match");
      res.status(400).json({ message: "Incorrect email or password..." });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "logged in succesfully" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//localhost3001/api/users/logout (post request)
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
