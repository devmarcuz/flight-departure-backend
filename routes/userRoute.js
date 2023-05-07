const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controller/userController");

router.post("/add-user", registerUser);
router.post("/login-user", loginUser);
router.get("/", getUsers);

module.exports = router;
