const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sellingPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Expense;