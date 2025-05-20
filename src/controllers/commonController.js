const mongoose = require('mongoose');
const Schema = require('../models/schema.js')
const uuid = require('uuid')


exports.insert = async (req,res,next) =>{
    console.log("Indide insert ", req.data)
    const indexName = req.params.indexName;
    const data =new Object(req.body);

    data.referenceId == uuid.v1();


    data[`${indexName}Id`] = uuid.v1();

    data.createdOn = new Date().toISOString();
    data.updatedOn = new Date().toISOString();
    
    try{
        
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
                
        const document =Model(data);
        

        document.save()
        .then(async data => {
            console.log(`data saved: ${data}`)
            res.json(data)
        })

    }catch (err) {
        console.log(err)
        res.status(500).send({error : err})
    }

}


exports.update = async (req,res,next) =>{
    const indexName = req.params.indexName;
    const data =new Object(req.body);

    data.referenceId == uuid.v1();


    data[`${indexName}Id`] = uuid.v1();
    // data[`orderId`] = uuid.v1();

    data.createdOn = new Date().toISOString();
    data.updatedOn = new Date().toISOString();
    console.log(data)
    try{
        
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
                Model.findOne()
        const document =Model(data);
        

        document.save()
        .then(async data => {
            console.log(`data saved: ${data}`)
            res.json(data)
        })

    }catch (err) {
        console.log(err)
        res.status(500).send({error : err})
    }

}



exports.findOne = async (req, res, next) => {
    const indexName = req.params.indexName;
    const id = req.params.id;
    
   
    try {
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
            
               let  document = await Model.findOne({ $or: [
                    { [`${indexName}Id`]: id }]}); 
                
        
        if (!document) {
            return res.status(404).send({ error: 'Document not found' });
        }

        res.json(document);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};

exports.find = async (req, res, next) => {
    const indexName = req.params.indexName;
    console.log(indexName)
    const query = req.body;
    console.log("query" , query);
    try {
        const Model = mongoose.models[`${indexName}Model`] || mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);
        const documents = await Model.find(query);
        
        
        res.json(documents);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};