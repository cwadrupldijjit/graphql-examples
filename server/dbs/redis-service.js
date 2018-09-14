const redis = require('redis');
const chalk = require('chalk').default;

const client = redis.createClient();

let isConnectionActive = false;

client
    .on('connect', err => {
        console.info(chalk.blue('Redis store connected'));
        isConnectionActive = true;
    })
    .on('reconnecting', () => {
        console.warn(chalk.yellow('Redis connection lost'));
        isConnectionActive = false;
    })
    .on('error', err => {
        console.error(chalk.red('Redis received error:'), err);
    })
    .on('end', () => {
        console.warn(chalk.blue('Redis connection closed'));
    });

function isConnected() {
    return isConnectionActive;
}

module.exports = {
    isConnected,
};