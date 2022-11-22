const Post = require('../model/Post');
const User = require('../model/User');
const Comment = require('../model/Comment');
const uuid = require('node-uuid');

// 新增
async function create(params) {
    console.log(params);
    const uid = uuid.v1();
    const user = await User.findOne({
        where: { userName: params.userName }
    });
    if (user) {
        const post = await Post.create({
            id: uid,
            author: user.dataValues.uid,
            ...params
        });
        return post;
    } else {
        return user;
    }
}

// 查询列表
async function query() {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                as: 'poster',
                attributes: ['userName', 'nickName', 'gender', 'description']
            },
        ],
        order: [
            ['dateTime', 'ASC']
        ]
    });
    return posts;
}

// 详情
async function detail(id) {
    const post = await Post.findOne({
        where: id,
        include: [
            {
                model: User,
                as: 'poster',
                attributes: ['userName', 'nickName', 'gender', 'description']
            }
        ]
    });
    return post;
}

module.exports = {
    create,
    query,
    detail,
}