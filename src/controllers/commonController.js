const mongoose = require('mongoose');
const Schema = require('../models/schema.js');
const uuid = require('uuid');

// Insert Handler
exports.insert = async (req, res, next) => {
    

    const indexName = req.params.indexName;
    const data = { ...req.body };

    // Correct assignment operator used here
    data.referenceId = uuid.v1();
    data[`${indexName}Id`] = uuid.v1();

    data.createdOn = new Date().toISOString();
    data.updatedOn = new Date().toISOString();

    try {
        // Load or compile schema model dynamically
        const Model = mongoose.models[`${indexName}Model`] ||
                      mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);

        const document = new Model(data);

        document.save()
            .then(savedData => {
                console.log(`Data saved:`, savedData);
                res.json(savedData);
            })
            .catch(saveErr => {
                console.log(saveErr);
                res.status(500).send({ error: saveErr.message });
            });

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};

// Update Handler (currently behaves like insert)
exports.update = async (req, res, next) => {
    const indexName = req.params.indexName;
    const data = { ...req.body };

    data.referenceId = uuid.v1();
    data[`${indexName}Id`] = uuid.v1();

    data.createdOn = new Date().toISOString();  // Usually not reset on update
    data.updatedOn = new Date().toISOString();

    console.log("Update data:", data);

    try {
        const Model = mongoose.models[`${indexName}Model`] ||
                      mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);

        const document = new Model(data);

        document.save()
            .then(savedData => {
                console.log(`Data updated:`, savedData);
                res.json(savedData);
            })
            .catch(saveErr => {
                console.log(saveErr);
                res.status(500).send({ error: saveErr.message });
            });

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};

// Find One Handler
exports.findOne = async (req, res, next) => {
    const indexName = req.params.indexName;
    const id = req.params.id;

    try {
        const Model = mongoose.models[`${indexName}Model`] ||
                      mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);

        const document = await Model.findOne({
            $or: [
                { [`${indexName}Id`]: id },
                { referenceId: id }
            ]
        });

        if (!document) {
            return res.status(404).send({ error: 'Document not found' });
        }

        res.json(document);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};

// Find All or Filtered Documents Handler
exports.find = async (req, res, next) => {
    const indexName = req.params.indexName;
    const query = req.body;

    console.log("Index:", indexName);
    console.log("Query:", query);

    try {
        const Model = mongoose.models[`${indexName}Model`] ||
                      mongoose.model(`${indexName}Model`, Schema[indexName], `${indexName}s`);

        const documents = await Model.find(query);
        res.json(documents);

    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
};
