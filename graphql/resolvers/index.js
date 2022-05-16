const productsResolvers = require("./products");
const usersResolvers = require("./users");
const ordersResolvers = require("./orders");
const categoriesResolvers = require("./categories");
const discountsResolvers = require("./discounts");
const addressessResolvers = require("./addressess");

module.exports = {
  Query: {
    ...productsResolvers.Query,
    ...ordersResolvers.Query,
    ...usersResolvers.Query,
    ...categoriesResolvers.Query,
    ...discountsResolvers.Query,
    ...addressessResolvers.Query,
  },
  Mutation: {
    ...productsResolvers.Mutation,
    ...usersResolvers.Mutation,
    ...ordersResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...discountsResolvers.Mutation,
    ...addressessResolvers.Mutation,
  },
};
