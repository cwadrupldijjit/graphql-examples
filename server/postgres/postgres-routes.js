const graphql = require('express-graphql');

const postgresService = require('./postgres-service');
const schema = require('./postgres-schema');

function PostgresRouter(app) {
    app.use('/postgres', (req, res, next) => {
        if (!postgresService.isConnected()) {
            return next({ message: 'Unable to complete request', code: 500 });
        }
        
        postgresService.getService()
            .then(db => {
                req.db = db;
                
                next();
            });
    });
    
    app.get('/postgres/rest', (req, res) => {
        res.send('hit postgres rest endpoint');
    });
    
    app.use('/postgres/graphql', graphql({
        graphiql: true,
        schema,
    }));
}

module.exports = PostgresRouter;