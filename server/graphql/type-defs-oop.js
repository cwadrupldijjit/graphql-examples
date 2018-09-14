const { GraphQLScalarType, GraphQLObjectType, GraphQLInputObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList } = require('graphql');

function createSchema(resolvers) {
    const dateType = new GraphQLScalarType({
        name: 'Date',
        description: 'A representation of a Date data type',
        /**
         * 
         * @param {Date} value 
         */
        serialize(value) {
            return value.toISOString();
        },
        /**
         * 
         * @param {string} value 
         * @returns {Date}
         */
        parseValue(value) {
            return new Date(value);
        },
        parseLiteral(ast) {
            if (!isNaN(new Date(ast.value).getTime())) {
                return new Date(ast.value);
            }
            
            return null;
        }
    });
    
    const vacationSpotType = new GraphQLObjectType({
        name: 'VacationSpot',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            image: { type: GraphQLString },
        },
    });
    
    const favoriteSpotType = new GraphQLObjectType({
        name: 'FavoriteSpot',
        fields: () => ({
            id: { type: new GraphQLNonNull(GraphQLInt) },
            user: { type: userResultType },
            vacationSpot: { type: vacationSpotType },
            notes: { type: GraphQLString },
        }),
    });
    
    const userInputType = new GraphQLInputObjectType({
        name: 'UserInput',
        fields: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        },
    });
    
    const userResultType = new GraphQLObjectType({
        name: 'UserResult',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            created_at: { type: dateType },
            modified_at: { type: dateType },
            favoriteSpots: { type: new GraphQLList(favoriteSpotType), resolve(user, args, context, info) {
                return resolvers.Query.favoriteSpots(user, { userId: user.id }, context, info);
            }},
        },
    });

    const queryType = new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userResultType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLInt) },
                },
                resolve: resolvers.Query.user,
            },
            users: {
                type: new GraphQLList(userResultType),
                args: {
                    name: { type: GraphQLString },
                    email: { type: GraphQLString },
                    created_at: { type: dateType },
                    modified_at: { type: dateType },
                },
                resolve: resolvers.Query.users,
            },
            vacationSpot: {
                type: vacationSpotType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLInt) },
                },
                resolve: resolvers.Query.vacationSpot,
            },
            vacationSpots: {
                type: new GraphQLList(vacationSpotType),
                args: {
                    name: { type: GraphQLString },
                    description: { type: GraphQLString },
                },
                resolve: resolvers.Query.vacationSpots,
            },
            favoriteSpot: {
                type: favoriteSpotType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLInt) },
                },
                resolve: resolvers.Query.favoriteSpot,
            },
            favoriteSpots: {
                type: new GraphQLList(favoriteSpotType),
                args: {
                    userId: { type: GraphQLInt },
                    vacationSpotId: { type: GraphQLInt },
                },
                resolve: resolvers.Query.favoriteSpots,
            },
        },
    });
    
    const mutationType = new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            addUser: {
                type: userResultType,
                args: {
                    user: { type: new GraphQLNonNull(userInputType) },
                },
                resolve: resolvers.Mutation.addUser,
            },
        },
    });

    return new GraphQLSchema({
        query: queryType,
        mutation: mutationType,
    });
}

module.exports = {
    createSchema,
};