const Discount = require("../../models/Discount");
const checkAuth = require("../../utils/check-auth");
const { docFormater } = require("../../utils/docFormater");

// const discountFormater = (discount) => {
//   return {
//     ...discount._doc,
//     createdAt: formatDate(discount._doc.createdAt),
//     updatedAt: formatDate(discount._doc.updatedAt),
//   };
// };

module.exports = {
  Query: {
    getDiscounts: async () => {
      try {
        const discounts = await Discount.find();
        return discounts.map((discount) => {
          return docFormater(discount);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getDiscount: async (_, args) => {
      try {
        const discount = await Discount.findById(args.discountId);
        return docFormater(discount);
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createDiscount: async (_, args, context) => {
      const user = checkAuth(context);
      const {
        discountInput: { name, description, percent, active },
      } = args;
      try {
        const discount = new Discount({
          name,
          description,
          percent,
          active,
        });

        await discount.save();
        return docFormater(discount);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
