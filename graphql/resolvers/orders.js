const Order = require("../../models/Order");
const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");
const { docFormater } = require("../../utils/docFormater");

module.exports = {
  Query: {
    getOrders: async () => {
      const user = checkAuth(context);
      try {
        const orders = await Order.find();
        return orders.map((order) => {
          return docFormater(order);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getOrder: async (_, args, context) => {
      const user = checkAuth(context);

      try {
        const order = await Order.findById(args.orderId);

        return docFormater(order);
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createOrder: async (_, args, context) => {
      const user = checkAuth(context);
      try {
        const order = new Order(args.orderInput);

        await order.save();

        const currentUser = await User.findById(user.id);
        console.log(currentUser);
        currentUser.orders = [...currentUser.orders, order.id];
        await currentUser.save();

        return docFormater(order);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
