const db = require("../models");
const Récap = db.historique;
const Op = db.Sequelize.Op;


// Create and Save a new Récap
exports.create = (req, res) => {
    // Validate request
    if (!req.body.kcal) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    };

    // Create a Récap
    const récap = {
        quantity: req.body.quantity,
        protein: req.body.protein,
        lipid: req.body.lipid,
        carbohydrate: req.body.carbohydrate,
        kcal: req.body.kcal,
        date: req.body.date
    };

    // Save Récap in the database
    Récap.create(récap)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Récap."
            });
        }); };

// Retrieve all Historique from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Récap.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving historique."
            });
        });
};

// Find a single Récap with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Récap.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Récap with id=" + id
            });
        });
};

// Update a Récap by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Récap.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Récap was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Récap with id=${id}. Maybe Récap was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Récap with id=" + id
            });
        });
};

// Delete a Récap with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Récap.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Récap was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Récap with id=${id}. Maybe Récap was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Récap with id=" + id
            });
        });
};
// Delete all Historique from the database.
exports.deleteAll = (req, res) => {
    Récap.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Historique were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all historique."
            });
        });
};

// Find all published Historique
exports.findAllPublished = (req, res) => {
    Récap.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving historique."
            });
        });
};
