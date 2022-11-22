const Sequelize = require('sequelize');
const config = require('./mysql_config');

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.host,
        dialect: 'mysql',
        define: {
            timestamps: false
        }
    }
);

// sequelize.authenticate().then(() => {
//     console.log('connection success');
//     process.exit();
// }).catch(err => {
//     console.log(err);
// });

module.exports = sequelize;
