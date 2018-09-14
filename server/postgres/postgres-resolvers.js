const postgresResolvers = {
    Query: {
        hello(root, args, context, info) {
            return 'Test';
        },
        user(_, args, context) {
            return context.db.Users.find(args.id)
                .then(user => ({ name: user.name, email: user.email, created_at: user.created_at, modified_at: user.modified_at }));
        },
        users(_, args, context) {
            return context.db.Users.find(args)
                .then(users => users.map(u => ({ id: u.id, name: u.name, email: u.email, created_at: u.created_at, modified_at: u.modified_at })));
        },
        vacationSpot(_, args, context) {
            return context.db.VacationSpots.find(args.id);
        },
        vacationSpots(_, args, context) {
            return context.db.VacationSpots.find();
        },
        async favoriteSpot(_, args, context) {
            const spot = await context.db.FavoriteSpots.find(args.id);
            const [ vacationSpot, user ] = await Promise.all([
                context.db.VacationSpots.find(spot.vacation_spot_id),
                context.db.Users.find(spot.user_id),
            ]);
            
            return {
                notes: spot.notes,
                vacationSpot,
                user,
            };
        },
        async favoriteSpots(_, args, context) {
            const { userId = -1, vacationSpotId = -1 } = args;
            const spots = await context.db.query(`
                SELECT * FROM "FavoriteSpots"
                WHERE user_id = \${userId}
                    OR vacation_spot_id = \${vacationSpotId}
            `, { userId, vacationSpotId });
            
            return Promise.all(spots.map(async spot => {
                const [ vacationSpot, user ] = await Promise.all([
                    context.db.VacationSpots.find(spot.vacation_spot_id),
                    context.db.Users.find(spot.user_id),
                ]);
                
                return {
                    id: spot.id,
                    notes: spot.notes,
                    vacationSpot,
                    user,
                };
            }));
        },
    },
    Mutation: {
        addUser(_, args, context) {
            return context.db.Users.insert(args.user);
        },
    },
};

module.exports = postgresResolvers;