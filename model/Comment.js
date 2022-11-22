const { DataTypes, Sequelize } = require('sequelize');
const moment = require('moment');
const Post = require('./Post.js');
const User = require('./User.js');
const Recom = require('./Recom');
const db = require('../config/db');

const Comment = db.define('Comment', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateTime: {
        type: DataTypes.DATE,
        defaultValue: moment(new Date()).format('YYYY-MM-DD hh:mm')
    },
    author: {
        type: DataTypes.UUID,
    },
    post: {
        type: DataTypes.UUID,
        references: { model: Post, key: 'id' }
    }
})

Comment.belongsTo(User, {
    as: 'poster',
    foreignKey: 'author',
    targetKey: 'uid'
})

Comment.hasMany(Recom, {
    as: 'recom',
    foreignKey: 'comment'
});

module.exports = Comment;
