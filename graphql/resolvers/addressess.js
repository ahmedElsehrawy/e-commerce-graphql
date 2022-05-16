const Address = require("../../models/Address");
const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");
const { docFormater } = require("../../utils/docFormater");

module.exports = {
  Query: {
    getAddressess: async () => {
      try {
        const addressess = await Address.find();
        return addressess.map((address) => {
          return docFormater(address);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getAddress: async (_, { addressId }) => {
      try {
        const address = await Address.findById(addressId);
        return docFormater(address);
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createAddress: async (_, args, context) => {
      const currentUser = checkAuth(context);
      try {
        const address = new Address(args.addressInput);
        await address.save();

        const user = await User.findById(currentUser.id);

        user.addressess = [...user.addressess, address.id];
        await user.save();

        return docFormater(address);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
