const Comment = require('../model/Comment');
const uuid = require('node-uuid');
const User = require('../model/User');
const Recom = require('../model/Recom');

const UserSrv = require('./UserSrv');
const RecomSrv = require('./RecomSrv');

// 列表查询
async function list(id) {
    const comments = await Comment.findAll({
        where: { post: id.id},
        include: [
            {
                model: User,
                as: 'poster',
                attributes: ['userName', 'nickName', 'gender', 'description']
            },
            {
                model: Recom,
                as: 'recom',
            }
        ],
        order: [
            ['dateTime', 'ASC']
        ]
    });
    let recoms = await RecomSrv.query(id.id);
    console.log(recoms);
    return comments;
}

// 新增
async function create(data) {
    const uid = uuid.v1();
    const result = await Comment.create({
        id: uid,
        ...data
    });
    return result;
}

module.exports = {
    list,
    create
}