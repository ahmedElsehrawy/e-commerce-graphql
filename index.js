const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const { PubSub } = require("graphql-subscriptions");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");

const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT || 8000;

const app = express();
app.listen(PORT, () => {
  console.log("App started");
});
const httpServer = http.createServer(app);

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return server.start();
  })
  .then((res) => {
    server.applyMiddleware({
      app,
      path: "/graphql",
    });
  })

  .catch((err) => {
    console.log(err);
  });
