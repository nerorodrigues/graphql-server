const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const getSchema = require('./graphql');
const {createDatabase} = require('./database');

const configureServer = async () => {
    const app = express();

    const db = await createDatabase();
    const { schema, resolver } = await getSchema();

    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: resolver,
        context: ({ req }) => {
            if(req){
                return{
                    user: req.user,
                    db
                }
            }
            
        }
    });

    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: { origin: '*' },
        bodyParserConfig: bodyParser.json()
    });
    return app;
}

const launchServer = async (port) => {
    const server = await configureServer();
    return new Promise((resolve, reject) => {
        server.listen(port, err => (err ? reject(err) : resolve({ server, port })));
    })
}

launchServer(8000).then(({ server, port }) => {
    server.use('/local', (req, res) => {
        res.type('application/json');
        res.statusCode = 200;
        res.json({
            'value': 'data'
        });
    });
    console.log('Listening on port 8000');
});