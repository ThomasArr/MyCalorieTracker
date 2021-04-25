module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("unit", {
        name: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.STRING
        }
    });

    return Unit;
};
