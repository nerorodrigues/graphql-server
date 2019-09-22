const fetch = require('node-fetch');

const company = [{ id: 1, nome: 'Empresa', isAdmin: true }].map(({ id, nome, isAdmin }) => ({
    _id: id,
        nome,
        isAdmin
}));

const users = [{ id: 1, nome: 'Admin', login: 'admin', empresaID: 1, senha: '' }].map(({ id, nome, login, empresaID, senha }) => ({
    _id: id,
        nome,
        login,
        empresaID,
        senha
}));


module.exports = {
    up: async (db) => {
        await db.company.insert(company);
        await db.user.insert(users);
    }
}
