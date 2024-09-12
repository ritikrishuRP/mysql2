const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'asunny@121', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;




