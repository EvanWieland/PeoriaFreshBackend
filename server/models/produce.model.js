module.exports = (sequelize, Sequelize) => {
    return sequelize.define("produce", {
        name: {
            type: Sequelize.STRING
        },
        plantDate: {
            type: Sequelize.DATE
        },
        harvestDate: {
            type: Sequelize.DATE
        },
        unit: {
            type: Sequelize.STRING
        }
    });
};