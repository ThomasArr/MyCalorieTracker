module.exports = app => {
    const aliments = require("../controllers/aliment.controller.js");

    var router = require("express").Router();

    // Create a new Aliment
    router.post("/", aliments.create);

    // Retrieve all Aliments
    router.get("/", aliments.findAll);


    // Retrieve a single Aliment with id
    router.get("/:id", aliments.findOne);

    // Update a Aliment with id
    router.put("/:id", aliments.update);

    // Delete a Aliment with id
    router.delete("/:id", aliments.delete);

    // Delete all Aliments
    router.delete("/", aliments.deleteAll);

    app.use('/api/aliments', router);
};
