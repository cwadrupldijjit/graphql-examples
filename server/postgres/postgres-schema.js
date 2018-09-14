const { createSchema } = require('../graphql/type-defs-oop');
const postgresResolvers = require('./postgres-resolvers');

module.exports = createSchema(postgresResolvers);