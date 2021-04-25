const db = require("../models");
const Unit = db.units;
const Op = db.Sequelize.Op;


// Create and Save a new Unit
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    };

    // Create a Unit
    const unit = {
        name: req.body.name,
        weight: req.body.weight,
        unitId: req.body.unitId,
    };

    // Save Unit in the database
    Unit.create(unit)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Unit."
            });
        }); };

// Retrieve all Units from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Unit.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving units."
            });
        });
};

// Find a single Unit with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Unit.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Unit with id=" + id
            });
        });
};

// Update a Unit by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Unit.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Unit was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Unit with id=${id}. Maybe Unit was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Unit with id=" + id
            });
        });
};

// Delete a Unit with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Unit.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Unit was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Unit with id=${id}. Maybe Unit was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Unit with id=" + id
            });
        });
};
// Delete all Units from the database.
exports.deleteAll = (req, res) => {
    Unit.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Units were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all units."
            });
        });
};

// Find all published Units
exports.findAllPublished = (req, res) => {
    Unit.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving units."
            });
        });
};

