const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter the field"],
    },
    email: {
      type: String,
      required: [true, "please enter the field"],
    },
    password: {
      type: String,
      required: [true, "please enter the field"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("user", userSchema);
