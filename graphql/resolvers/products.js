const Category = require("../../models/Category");
const Comment = require("../../models/Comment");
const Product = require("../../models/Product");
const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");
const { docFormater } = require("../../utils/docFormater");

const checkIfUserExist = async (userId) => {
  const isUserExist = await User.findById(userId);

  if (!isUserExist) {
    throw new Error("User probably deleted");
  }
};

const NEW_PRODUCT = "NEW_PRODUCT";

module.exports = {
  Subscription: {
    newProduct: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_PRODUCT),
    },
  },
  Query: {
    getProducts: async () => {
      try {
        const products = await Product.find().populate([
          "category",
          "comments",
        ]);
        return products.map((product) => {
          return docFormater(product);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getProduct: async (_, args) => {
      const productId = args.productId;
      try {
        const product = await Product.findById(productId).populate([
          "category",
          "comments",
        ]);
        return docFormater(product);
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createProduct: async (_, args, context) => {
      const user = checkAuth(context);
      try {
        if (user.role === "CUSTOMER") {
          throw new Error("User of type Customer is not allowed to do that");
        }
        await checkIfUserExist(user.id);
        const { productInput } = args;
        const product = new Product({
          ...productInput,
          allRate: 0,
          comments: [],
        });
        await product.save();

        const category = await Category.findById(productInput.category);

        const newProduct = {
          ...docFormater(product),
          category: docFormater(category),
        };

        context.pubsub.publish(NEW_PRODUCT, {
          newProduct: newProduct,
        });

        return newProduct;
      } catch (err) {
        console.log(err);
      }
    },
    createComment: async (_, args, context) => {
      const user = checkAuth(context);

      try {
        await checkIfUserExist(user.id);
        const product = await Product.findById(args.productId);
        if (!product) {
          throw new Error("sorry product doesn't exist maybe it is deleted");
        }

        let comment = {
          author: user.id,
          body: args.commentBody,
        };

        const createdComment = new Comment(comment);
        await createdComment.save();

        product.comments = [...product.comments, createdComment.id];
        await product.save();

        const theUpdatedProduct = await Product.findById(
          args.productId
        ).populate(["comments", "category"]);

        return docFormater(theUpdatedProduct);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
