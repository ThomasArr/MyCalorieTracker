module.exports = (sequelize, Sequelize) => {
    const Aliment = sequelize.define("aliment", {
        name: {
            type: Sequelize.STRING
        },
        protein: {
            type: Sequelize.STRING
        },
        lipid: {
            type: Sequelize.STRING
        },
        carbohydrate: {
            type: Sequelize.STRING
        },
        kcal: {
            type: Sequelize.STRING
        },
        categorie: {
            type: Sequelize.STRING
        }
    });

    return Aliment;
};

