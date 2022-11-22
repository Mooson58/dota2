const PostSrv = require('../Services/PostSrv');
const ComtSrv = require('../Services/ComtSrv');

// 新增
const create = async(ctx, next) => {
    const params = ctx.request.body;
    if (!params.title) {
        ctx.body = {
            msg: '标题不能为空',
            success: false
        }
    } else {
        const result = await PostSrv.create(params);
        if (result) {
            ctx.body = {
                msg: '发布成功',
                success: true
            }
        } else {
            ctx.body = {
                msg: '请求出错',
                success: false
            }
        }
    }
}

// 查询
const query = async (ctx, next) => {
    const result = await PostSrv.query();
    return ctx.body = {
        success: true,
        data: result
    }
}

// 详情
const detail = async (ctx, next) => {
    const id = ctx.request.params;
    const result = await PostSrv.detail(id);
    const comments = await ComtSrv.list(id);
    ctx.body = {
        data: {
            post: result,
            comments
        }
    }
}

module.exports = {
    create,
    query,
    detail,
}