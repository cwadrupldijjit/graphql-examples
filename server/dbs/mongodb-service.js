const mongoose = require('mongoose');
const chalk = require('chalk').default;

mongoose.connect('mongodb://localhost/graphql-preparation')
    .catch(err => {
        console.error(chalk.red('Mongo couldn\'t connect:'), err);
    });

mongoose.connection.on('connected', () => {
    console.info(chalk.blue('Mongodb connected'));
});

function isConnected() {
    return mongoose.connection.readyState == 1;
}

module.exports = {
    isConnected,
};