
const Schema = require('../models/schema');

exports.checkIndex = async (req, res, next) => {
    const indexName = req.params.indexName;
    console.log("Inside the checkIndex", req.data)


    if (Schema.hasOwnProperty(indexName)) {
        next()
    } else {
        res.status(404).json({ message: 'This endpoint has not been registered' });
    }
}