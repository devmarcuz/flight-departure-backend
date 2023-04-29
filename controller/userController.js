const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    return res.json({
      status: true,
      user: {
        username,
        email,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect username or password", status: false });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.json({ msg: "Incorrect username or password", status: false });

    return res.json({
      status: true,
      user: {
        username,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};
