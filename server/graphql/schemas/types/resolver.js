module.exports = {
    resolver: {
        Query: {
            test: (root, args, context) => {
                return { nome: 'data' };
            }
        },
        Mutation: {
            valor: (root, args, context) => {
                return args.email;
            }
        }
    }
}