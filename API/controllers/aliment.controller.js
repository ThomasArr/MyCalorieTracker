const db = require("../models");
const Aliment = db.aliments;
const Unit = db.units;
const Op = db.Sequelize.Op;


// Create and Save a new Aliment
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    };

    // Create a Aliment
    const aliment = {
        name: req.body.name,
        protein: req.body.protein,
        lipid: req.body.lipid,
        carbohydrate: req.body.carbohydrate,
        kcal : req.body.kcal,
        categorie: req.body.categorie
    };

    console.log("creation en cours")

    // Save Aliment in the database
    Aliment.create(aliment)
        .then(data => {
            res.send(data);
            if (req.body.units) {

                req.body.units.map(unit => {
                    const new_unit = {
                        name: unit.name,
                        weight: unit.weight,
                        alimentId: data.dataValues.id,
                    }
                    Unit.create(new_unit)
                })
            }

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Aliment."
            });
        }); };

exports.findAll = (req, res) => {
    Aliment.findAll({
        include: ["units"],
    }).then((data) => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving aliments."
            });
        });
};

// Find a single Aliment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Aliment.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Aliment with id=" + id
            });
        });
};

// Update a Aliment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Aliment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Aliment was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Aliment with id=${id}. Maybe Aliment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Aliment with id=" + id
            });
        });
};

// Delete a Aliment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Aliment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Aliment was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Aliment with id=${id}. Maybe Aliment was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Aliment with id=" + id
            });
        });
};
// Delete all Aliments from the database.
exports.deleteAll = (req, res) => {
    Aliment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Aliments were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all aliments."
            });
        });
};

// Find all published Aliments
exports.findAllPublished = (req, res) => {
    Aliment.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving aliments."
            });
        });
};

// Création des unités

exports.createUnit = (alimentId, unit) => {
    return Unit.create({
        name: unit.name,
        weight: unit.weight,
        alimentId: alimentId,
    })
        .then((unit) => {
            console.log(">> Created unit: " + JSON.stringify(unit, null, 4));
            return unit;
        })
        .catch((err) => {
            console.log(">> Error while creating unit: ", err);
        });
};

exports.findAlimentById = (alimentId) => {
    return Aliment.findByPk(alimentId, { include: ["units"] })
        .then((aliment) => {
            return aliment;
        })
        .catch((err) => {
            console.log(">> Error while finding aliment: ", err);
        });
};


