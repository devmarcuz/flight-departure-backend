const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  recruiter: {
    type: Array,
    default: [],
  },
  visitor: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
