const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sgerd_com',
    password: '',
    port: 5432
})

module.exports = pool