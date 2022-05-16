const { gql } = require("apollo-server-express");

module.exports = gql`
  # Enums.................................................................................
  enum RoleEnum {
    ADMIN
    CUSTOMER
  }

  # Types..................................................................................
  type OrderItem {
    productId: ID!
    amount: Int!
  }

  type Order {
    _id: ID!
    totalPrice: Float!
    items: [OrderItem!]!
    createdAt: String!
    updatedAt: String!
  }

  type OrderID {
    _id: ID!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    role: RoleEnum!
    token: String!
    orders: [OrderID]!
    addressess: [Address!]!
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    _id: ID!
    author: ID!
    body: String!
    createdAt: String!
    updatedAt: String!
  }

  type Category {
    _id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }

  type Product {
    _id: ID!
    title: String!
    description: String!
    price: Int!
    isAvailable: Boolean!
    availableInStock: Int!
    color: String
    comments: [Comment!]!
    category: Category!
    allRate: Float!
    createdAt: String!
    updatedAt: String!
  }

  type Address {
    _id: ID!
    userId: ID!
    country: String!
    city: String!
    address: String!
    postalCode: String!
    telephone: String
    mobile: String!
    createdAt: String!
    updatedAt: String!
  }

  type Discount {
    _id: ID!
    name: String!
    description: String!
    percent: Float!
    active: Boolean
    createdAt: String!
    updatedAt: String!
  }

  # Inputs................................................................................
  input createProductInput {
    title: String!
    description: String!
    price: Int!
    isAvailable: Boolean!
    availableInStock: Int!
    color: String
    category: ID!
  }

  input createUserInput {
    username: String!
    email: String!
    password: String!
    role: RoleEnum!
  }

  input OrderItemInput {
    productId: ID!
    amount: Int!
  }

  input createOrderInput {
    totalPrice: Float!
    items: [OrderItemInput!]!
  }

  input createDiscountInput {
    name: String!
    description: String!
    percent: Float!
    active: Boolean!
  }

  input createAddressInput {
    userId: ID!
    country: String!
    city: String!
    address: String!
    postalCode: String!
    telephone: String
    mobile: String!
  }

  # Query and Mutation......................................................................
  type Query {
    me: User!
    getProducts: [Product!]!
    getProduct(productId: ID!): Product!
    getOrders: [Order!]!
    getOrder(orderId: ID!): Order!
    getCategories: [Category!]!
    getDiscounts: [Discount!]!
    getDiscount(discountId: ID!): Discount!
    getAddressess: [Address!]!
    getAddress(addressId: ID!): Address!
  }

  type Mutation {
    createProduct(productInput: createProductInput!): Product!
    createUser(userInput: createUserInput!): User!
    login(email: String!, password: String!): User!
    createOrder(orderInput: createOrderInput): Order!
    createComment(productId: ID!, commentBody: String!): Product!
    createCategory(name: String!, description: String!): Category!
    createDiscount(discountInput: createDiscountInput!): Discount!
    createAddress(addressInput: createAddressInput!): Address!
  }

  type Subscription {
    newProduct: Product!
  }
`;
