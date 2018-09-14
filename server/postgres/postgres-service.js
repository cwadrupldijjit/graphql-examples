const { join } = require('path');
const massive = require('massive');
const chalk = require('chalk').default;

let db;

connect();

function connect() {
    return massive('postgres://sample:12345@localhost:5432/sample', { scripts: join(__dirname, 'postgres-scripts') })
        .then(dbInstance => {
            console.info(chalk.blue('Postgres connected'));
            return db = dbInstance;
        })
        .catch(err => {
            console.error(chalk.red('Error happened when trying to connect to Postgres'), err);
            throw err;
        });
    
}

function isConnected() {
    return Boolean(db);
}

async function getService() {
    if (!isConnected()) {
        await connect();
    }
    
    return db;
}

module.exports = {
    isConnected,
    getService,
};