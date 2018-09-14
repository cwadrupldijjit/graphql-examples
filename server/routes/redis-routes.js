const redisService = require('../dbs/redis-service');

function RedisRouter(app) {
    app.use('/redis', (req, res, next) => {
        if (!redisService.isConnected()) {
            return next({ message: 'Unable to complete request', code: 500 });
        }
        
        req.db = redisService;
        
        next();
    });
    
    app.get('/redis/rest', (req, res) => {
        res.send('hit redis rest endpoint');
    });
}

module.exports = RedisRouter;