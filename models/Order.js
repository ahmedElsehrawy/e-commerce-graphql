const mongoose = require("mongoose");

const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
