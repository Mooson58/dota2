const { Sequelize, Model, DataTypes } = require('sequelize');

const db = require('../config/db');

const User = db.define('User', {
    uid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        defaultValue: '0',
    },
    description: {
        type: DataTypes.TEXT
    }
});

module.exports = User;