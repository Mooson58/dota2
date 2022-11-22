const Koa = require('koa2');
const app = new Koa();
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
// const cookieParser = require('cookie-parser');
const session = require('koa-session');

const config = {
    key: 'koa:sess',   //cookie key (default is koa:sess)
    maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
    overwrite: true,  //是否可以overwrite    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: false,   //签名默认true
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //(boolean) renew session when session is nearly expired,
 };

// app.use(cookieParser());
app.use(session(config, app));

const cors = require('koa2-cors');

// app.use(cors({
//     origin: function(ctx) {
//         return ctx.request.headers.origin || ''
//     },
//     credentials: true,
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }));

// app.use(cookieParser());

app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            if (ctx.url === '/test') {
                return '*'; // 允许来自所有域名请求
            }
            // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
            return '*';
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
  );

const initRouter = require('./router');

app.use(bodyparser());
initRouter(app);

// const errConf = {
//     redirect: '/error'
// }

// app.use(async (ctx, next) => {
//     if (ctx.request.url !== '/') {
//         ctx.throw(500);
//         return
//     }
//     await next();
// });

app.listen(3000, () => {
    console.log('DOTA2 Server is running at 3000 port');
})

// onerror(app, errConf);