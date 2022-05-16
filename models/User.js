const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema(
  {
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
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    ],
    addressess: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Address",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
