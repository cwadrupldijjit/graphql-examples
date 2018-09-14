const graphql = require('graphql');

module.exports = graphql.buildSchema(`
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

type VacationSpot {
    id: Int!
    name: String!
    description: String!
    image: String
}

type FavoriteSpot {
    id: Int!
    user: UserResult!
    vacationSpot: VacationSpot!
    notes: String
}

type Query {
    hello: String!
    user(id: Int!): UserResult
    users(name: String, email: String, created_at: Date, modified_at: Date): [UserResult]
    vacationSpot(id: Int!): VacationSpot
    vacationSpots: [VacationSpot]
    favoriteSpot(id: Int!): FavoriteSpot
    favoriteSpots(userId: Int, vacationSpotId: Int): [FavoriteSpot]
}

type Mutation {
    addUser(user: UserInput): UserResult
}
`);