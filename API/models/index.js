const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.aliments = require("./aliment.model.js")(sequelize, Sequelize);
db.units = require("./unit.model.js")(sequelize, Sequelize);
db.historique= require("./récap.model")(sequelize, Sequelize);

db.aliments.hasMany(db.units, { as: "units" });
db.units.belongsTo(db.aliments, {
    foreignKey: "alimentId",
    as: "aliment",
});

module.exports = db;
