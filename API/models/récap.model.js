module.exports = (sequelize, Sequelize) => {
    const Récap = sequelize.define("récap", {
        quantity: {
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
        date: {
            type: Sequelize.DATE
        },
    });

    return Récap;
};
