module.exports = app => {
    const historique = require("../controllers/récap.controller.js");

    var router = require("express").Router();

    // Create a new Récap
    router.post("/", historique.create);

    // Retrieve all Historique
    router.get("/", historique.findAll);

    // Retrieve all published Historique
    router.get("/published", historique.findAllPublished);

    // Retrieve a single Récap with id
    router.get("/:id", historique.findOne);

    // Update a Récap with id
    router.put("/:id", historique.update);

    // Delete a Récap with id
    router.delete("/:id", historique.delete);

    // Delete all Historique
    router.delete("/", historique.deleteAll);

    app.use('/api/historique', router);
};
