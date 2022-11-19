module.exports = (sequelize, Sequelize) => {
    return sequelize.define("requests", {
        quantity: {
            type: Sequelize.INTEGER
        },
    });
};