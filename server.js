const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

const db = require("./API/models");
db.sequelize.sync();

/*
var corsOptions = {
    origin: "http://localhost:8080"
};
*/


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hello to the my PII presentation Viewers." });
});

require("./API/models/récap.routes")(app);
require("./API/models/aliment.routes")(app);
require("./API/models/unit.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

/*
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/

