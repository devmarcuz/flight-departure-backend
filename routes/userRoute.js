const router = require("express").Router();
const {
  registerUser,
  loginUser,
} = require("../controller/userController");

router.post("/add-user", registerUser);
router.post("/login-user", loginUser);

module.exports = router;
