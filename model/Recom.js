const { DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');
const Comment = require('./Comment');
const User = require('./User');

const Recom = db.define('Recom', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: moment(new Date()).format('YYYY-MM-DD hh:mm')
    },
    comment: {
        type: DataTypes.UUID
    },
    author: {
        type: DataTypes.UUID
    },
    recomer: {
        type: DataTypes.UUID,
        defaultValue: null
    }
});

Recom.associate = (models) => {
    Recom.belongsTo(Comment);
    Recom.belongsTo(User);
}

module.exports = Recom;
