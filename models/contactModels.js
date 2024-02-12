const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "pelase enter the field"],
    },

    number: {
      type: String,
      required: [true, "pelase enter the field"],
    },
    email: {
      type: String,
      required: [true, "pelase enter the field"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
