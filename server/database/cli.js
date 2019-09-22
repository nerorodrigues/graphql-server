const { createDatabase, seedDb } = require('./index');


require('yargs').command(
    'seed <name>',
    'seed the database',
    yargs => yargs.positional('name', { describe: 'the name of the seed to run' }),
    async ({ name }) => {
        const db = await createDatabase();
        console.log('Seeding database from', name);
        try {
            await seedDb(db, name);
            console.log('Completed!');
        } catch (error) {
            console.error('Failed', error);
        }
    },
).argv;