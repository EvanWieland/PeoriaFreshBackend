module.exports = (sequelize, Sequelize) => {
    return sequelize.define("schedule", {
        sunday: {
            type: Sequelize.STRING
        },
        monday: {
            type: Sequelize.STRING
        },
        tuesday: {
            type: Sequelize.STRING
        },
        wednesday: {
            type: Sequelize.STRING
        },
        thursday: {
            type: Sequelize.STRING
        },
        friday: {
            type: Sequelize.STRING
        },
        saturday: {
            type: Sequelize.STRING
        }
    });
};