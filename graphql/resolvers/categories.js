const Category = require("../../models/Category");
const checkAuth = require("../../utils/check-auth");
const { docFormater } = require("../../utils/docFormater");

module.exports = {
  Query: {
    getCategories: async () => {
      try {
        const categories = await Category.find();
        return categories.map((category) => {
          return docFormater(category);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createCategory: async (_, args, context) => {
      const { name, description } = args;
      const user = checkAuth(context);

      try {
        const category = new Category({
          name,
          description,
        });

        await category.save();
        return docFormater(category);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
