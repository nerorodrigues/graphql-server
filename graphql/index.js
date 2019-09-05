const schemaglue = require('schemaglue');


const getSchemas = async()=>{
    return await schemaglue('graphql/schemas');
}

module.exports = getSchemas;