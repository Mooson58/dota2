const sequelize = require('../config/db');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

// 查询
async function query(id) {
    const user = await User.findOne({
        where: { uid: id.id }
    })
    return user;
}

// 登录
async function login(params) {
    const { userName, password } = params;
    const user = await User.findOne({
        where: { userName: userName },
    });
    console.log(user);
    if (!user) {
        return {
            msg: '账号或密码不正确',
            success: false,
        }
    } else {
        const flag = bcrypt.compareSync(password, user.dataValues.password);
        if (flag) {
            return {
                msg: '登录成功',
                success: true,
                data: user,
            }
        } else {
            return {
                msg: '账号或密码不正确',
                success: false,
            }
        }
    }
}

// 注册
async function register(params) {
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(params.password, salt);
    
    const user = await User.findOrCreate({
        where: { userName: params.userName },
        defaults: {
            ...Object.assign(params, {password: hash})
        },
    });
    return user[1];
}

// 修改
async function edit(uid, data) {
    const result = await User.update({
        ...data
    }, {
        where: { uid }
    });
    console.log(result);
    return result[0];
}

// 删除
async function del(uid) {
    const result = await User.destroy({
        where: { uid }
    });
    return result
}

module.exports = {
    register,
    edit,
    query,
    del,
    login,
}