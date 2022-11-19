const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

// Public
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.public = {
    allAccess: (req, res) => {
        res.status(200).send("Public Content.");
    },
    distributors: (req, res) => {
        db.distributor.findAll({
            attributes: ["id", "name", "phone", "address", "city", "state", "zip"]
        })
            .then(distributors => {
                if (!distributors) {
                    return res.status(404).send({message: "No distributors listed."});
                }

                res.status(200).send(distributors);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    },
    produce: (req, res) => {
        db.produce.findAll({
            attributes: ["id", "name", "unit", "plantDate", "harvestDate"]
        })
            .then(produce => {
                if (!produce) {
                    return res.status(404).send({message: "No produce listed."});
                }

                res.status(200).send(produce);
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
    },
    consumerRequest: async (req, res) => {
        const {distributorId, produce} = req.body;

        await produce.some(p => {
            const {produceId, quantity} = p;

            db.request.create({
                distributorId,
                produceId,
                quantity
            }).catch(() => {
                return res.status(500).send({message: "Error creating request."});
            })
        });

        res.status(200).send({message: "Requests created successfully."});
    }
}

// Consumer
exports.consumerBoard = (req, res) => {
    res.status(200).send("Consumer Content.");
};

// Distributor
exports.distributor = {
    distributorBoard: (req, res) => {
        res.status(200).send("Distributor Content.");
    },
    requests: async (req, res) => {

        const {distributors} = await db.user.findOne({
            where: {id: req.userId},
            include: db.distributor
        });

        const distributorRequests = [];

        for (let distributor of distributors) {
            const requests = await db.request.findAll({
                where: {distributorId: distributor.id},
            });

            for (let i = 0; i < requests.length; i++) {
                let produce = await db.produce.findOne({
                    where: {id: requests[i].produceId},
                    attributes: ["name", "unit"]
                });

                requests[i] = {...requests[i].dataValues, ...produce.dataValues};
            }

            distributorRequests.push({name: distributor.name, requests});
        }

        res.status(200).send(distributorRequests);
    }
}

// Producer
exports.producerBoard = (req, res) => {
    res.status(200).send("Producer Content.");
};

// Admin
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};