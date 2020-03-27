const knex = require('knex');
const configuratition = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuratition.test : configuratition.development;

const connection = knex(config);

module.exports = connection;