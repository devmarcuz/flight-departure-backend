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
    const { email, password } = req.body;

    if (email === "newuser@gmail.com" && password === "password123") {
      const user = await User.findOne({ email });

      user.recruiter = [...user.recruiter, true];

      await user.save();

      return res.json({
        status: true,
        user: {
          username: email,
          email,
          _id: Math.random() * 1083032940,
        },
      });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect credentials ", status: false });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.json({ msg: "Incorrect credentials  ", status: false });

    user.visitor = [...user.visitor, true];

    await user.save();

    return res.json({
      status: true,
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    await User.find();

    return res.status(200).json({ message: "successful" });
  } catch (error) {
    next(error);
  }
};
