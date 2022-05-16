const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const checkAuth = require("../../utils/check-auth");
const { SECRET_FOR_JWT } = require("../../config");
const { docFormater } = require("../../utils/docFormater");

const generateToken = (createdUser) => {
  return jwt.sign(
    {
      id: createdUser.id,
      email: createdUser.email,
      username: createdUser.username,
      role: createdUser.role,
    },
    SECRET_FOR_JWT,
    { expiresIn: "365d" }
  );
};

module.exports = {
  Query: {
    me: async (_, args, context) => {
      const authHeader = context.req.headers.authorization;
      const token = authHeader.split(" ")[1];
      const user = checkAuth(context);
      try {
        const currentUser = await User.findById(user.id).populate([
          "orders",
          "addressess",
        ]);

        return {
          ...docFormater(currentUser),
          token,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      const {
        userInput: { username, email, password, role },
      } = args;
      try {
        const isUserAlreadyExist = await User.findOne({ email });
        if (isUserAlreadyExist) {
          throw new Error("Error user already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          username,
          email,
          role,
          password: hashedPassword,
        });
        await user.save();

        const token = generateToken(user);
        return {
          ...docFormater(user),
          token,
          orders: [],
        };
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, args) => {
      try {
        const user = await User.findOne({ email: args.email });

        if (!user) {
          throw new Error("User not exist");
        }

        const match = await bcrypt.compare(args.password, user.password);

        if (!match) {
          throw new Error("wrong credentials");
        }

        const token = generateToken(user);

        return {
          ...docFormater(user),
          token,
        };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
