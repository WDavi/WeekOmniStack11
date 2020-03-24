const knex = require('knex');
const configuratition = require('../../knexfile');

const connection = knex(configuratition.development);

module.exports = connection;