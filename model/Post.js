const { DataTypes, Sequelize } = require('sequelize');
const User = require('./User');
const Comment = require('./Comment');
const moment = require('moment');

const db = require('../config/db');

const Post = db.define('Post', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    collectionCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    author: {
        type: DataTypes.UUID,
    }
})

Post.belongsTo(User, {
    as: 'poster',
    foreignKey: 'author',
    targetKey: 'uid'
});

module.exports = Post;
