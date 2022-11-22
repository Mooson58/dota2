const Recom = require('../model/Recom');
const uuid = require('node-uuid');

async function create(query) {
    const uid = uuid.v1();
    let result;
    try {
        result = await Recom.create({
            id: uid,
            ...query
        });
        console.log(result);
    } catch (error) {
        console.log(error)
    }
    return result
}

async function query(id) {
    const recom = Recom.findAll({
        where: { comment: id }
    });
    console.log(recom);
}

module.exports = {
    create,
    query,
}