const RecomSrv = require('../Services/RecomSrv');

const create = async (ctx, next) => {
    const query = ctx.request.body;
    const result = await RecomSrv.create(query);
    ctx.body = {
        data: result
    }
}

module.exports = {
    create
}