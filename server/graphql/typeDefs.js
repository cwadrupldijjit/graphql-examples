const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = `
scalar Date

input UserInput {
    name: String!
    email: String!
    password: String
}

type UserResult {
    name: String!
    email: String!
    created_at: Date
    modified_at: Date
    id: Int!
    favoriteSpots: [FavoriteSpot]
}

type Query {
    hello: String!
    user(id: Int!): UserResult
    users(name: String, email: String, created_at: Date, modified_at: Date): [UserResult]
}

type Mutation {
    addUser(user: UserInput): UserResult
}
`;

function createSchema(resolvers) {
    return makeExecutableSchema({ typeDefs, resolvers });
}

module.exports = {
    typeDefs,
    createSchema,
};