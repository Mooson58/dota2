const Router = require('koa-router');

const UserCtrl = require('./Controller/UserCtrl');
const PostCtrl = require('./Controller/PostCtrl');
const ComtCtrl = require('./Controller/ComtCtrl');
const RecomCtrl = require('./Controller/RecomCtrl');

const router = new Router;

module.exports =  (app) => {
    /**
     * User
     */
    // 登录
    router.get('/api/user/login', UserCtrl.login);
    // 注册
    router.post('/api/user/register', UserCtrl.register);
    // 修改
    router.put('/api/user/:id', UserCtrl.edit);
    // 查询
    router.get('/api/user/:id', UserCtrl.query);
    // 删除
    router.del('/api/user/:id', UserCtrl.del);
    // 验证码
    router.get('/api/getCaptcha', UserCtrl.getCaptcha);

    // 新增
    router.post('/api/post/create', PostCtrl.create);
    // 查询列表
    router.get('/api/post/query', PostCtrl.query);
    // 详情
    router.get('/api/post/:id', PostCtrl.detail);

    // 评论列表 --post-id
    router.get('/api/comments/:id', ComtCtrl.list);
    // 新增
    router.post('/api/comment/create', ComtCtrl.create);

    // 新增
    router.post('/api/recom/create', RecomCtrl.create);
    app.use(router.routes());
    app.use(router.allowedMethods());
};
