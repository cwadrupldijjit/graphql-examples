const mongoService = require('../dbs/mongodb-service');

function MongoRouter(app) {
    app.use('/mongo', (req, res, next) => {
        if (!mongoService.isConnected()) {
            return next({ message: 'Unable to complete request', code: 500 });
        }
        
        req.db = mongoService;
        
        next();
    });
    
    app.get('/mongo/rest', (req, res) => {
        res.send('Got to REST endpoint');
    });
}

module.exports = MongoRouter;