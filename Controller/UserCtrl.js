const bcrypt = require('bcryptjs');
const UserSrv = require('../Services/UserSrv');
const uuid = require('node-uuid');
const response = require('koa2/lib/response');
const User = require('../model/User');

const svgCaptcha = require('svg-captcha');

// 登录
const login = async (ctx, next) => {
    const query = ctx.query;
    const captcha = query.captcha.toLowerCase()
    console.log(captcha);
    const sessionCap = ctx.session.captcha
    console.log('session', ctx.session);
    if (captcha!==sessionCap) {
        throw new Error('验证码错误')
    }
    const result = await UserSrv.login(query);
    ctx.body = {
        ...result
    }
}

// 注册
const register = async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    if (userName && password) {
        const uid = uuid.v1();
        const params = {
            uid: uid,
            ...ctx.request.body
        }
        const result = await UserSrv.register(params);

        if (result) {
            // ctx.response.status = 200;
            ctx.body = {
                msg: '注册成功',
                success: true
            }
        } else {
            // ctx.response.status = 204;
            ctx.body = {
                msg: '用户已存在',
                success: false
            }
        }

        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(user, salt);
        // console.log(uid);
    } else {
        ctx.throw(400, '账号密码有误');
    }
}

// 编辑修改
const edit = async(ctx, next) => {
    const uid = ctx.params.id;
    const data = ctx.request.body;
    const result = await UserSrv.edit(uid, data);
    if (result) {
        ctx.body = {
            msg: '修改成功',
            success: true
        }
    } else {
        ctx.body = {
            msg: '修改失败',
            success: false
        }
    }
};

// 查询
const query = async(ctx, next) => {
    const id = ctx.request.params;
    const result = await UserSrv.query(id);
    ctx.body = {
        data: result
    }
}

// 删除
const del = async(ctx, next) => {
    const uid = ctx.params.id;
    const result = await UserSrv.del(uid);
    if (result) {
        ctx.body = {
            msg: '删除成功！',
            success: true
        }
    } else {
        ctx.body = {
            msg: '删除出错',
            success: false
        }
    }
}

// 生成验证码
const getCaptcha = (ctx, next) => {
    const captcha = svgCaptcha.create({
        inverse: false,
        fontSize: 36,
        noise: 2,
        width: 200,
        height: 50
    });
    ctx.session.captcha = captcha.text.toLowerCase();
    console.log(ctx.session);
    // ctx.res.cookie('captcha', ctx.req.session);
    ctx.res.setHeader('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
}

module.exports = {
    register,
    edit,
    query,
    del,
    login,
    getCaptcha,
};
