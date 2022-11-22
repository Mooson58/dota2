const ComtSrv = require('../Services/ComtSrv');

// 列表查询
const list = async (ctx, next) => {
    const id = ctx.request.params;
    const result = await ComtSrv.list(id);
    ctx.body = {
        data: result
    }
}

// 新增
const create = async (ctx, next) => {
    const data = ctx.request.body;
    const result = await ComtSrv.create(data);
    if (result) {
        ctx.body = {
            msg: '发布成功',
            success: true
        }
    } else {
        ctx.body = {
            msg: '创建失败',
            success: false
        }
    }
}

module.exports = {
    list,
    create,
}