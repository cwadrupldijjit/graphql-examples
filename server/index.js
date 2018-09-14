const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chalk = require('chalk').default;

const MongoRouter = require('./routes/mongodb-routes');
const PostgresRouter = require('./postgres/postgres-routes');
const RedisRouter = require('./routes/redis-routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

MongoRouter(app);
PostgresRouter(app);
RedisRouter(app);

app.listen(4000, () => {
    console.info(chalk.green(`app up and running at localhost:4000`));
});
