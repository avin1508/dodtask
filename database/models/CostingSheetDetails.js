const { Sequelize } = require('sequelize');

const sequelize = require("../../config/db.config.js");

const CostingDetails = sequelize.define("costingDetails", {
    costingSheetId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    fabricName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    curValue: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dutyValue: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    price: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true,
    },
    cons: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true
    },
    Inr: {
        type: Sequelize.DECIMAL(20, 2),
        allowNull: true
    },
    
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

});
module.exports = CostingDetails;
