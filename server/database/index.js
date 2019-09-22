const { homedir } = require('os');
const path = require('path');
const dataStore = require('nedb-promise');
const pkg = require('../package.json');

const defaultDatabaseFilename = () => path.join(homedir(),`${pkg.name}\\`, `${pkg.name}`);
const modelNames = ['user', 'company'];

const createDatabase = ({ filename = defaultDatabaseFilename(), autoload = true, ...rest } = {}) =>
    modelNames.reduce(
        (db, model) => ({
            ...db,
            [model]: new dataStore({
                filename: `${filename}.${model}.db`,
                autoload,
                ...rest
            }),
        }),
        {}
    );

const seedDatabase = async (query, seedName) => {
    console.log(2);
    const { up } = require(path.join(__dirname, 'seeds', `${seedName}.js`));
    await up(query);
}

module.exports = {createDatabase, seedDatabase};