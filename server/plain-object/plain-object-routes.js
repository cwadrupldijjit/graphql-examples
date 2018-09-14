const express = require('express');
const graphql = require('express-graphql');
const root = require('./plain-object-resolvers');
const schema = require('./plain-object-schema');

const PlainObjectRouter = express.Router();

PlainObjectRouter.use('/graphql', graphql({
    graphiql: true,
    schema,
    rootValue: root,
}));

module.exports = PlainObjectRouter;