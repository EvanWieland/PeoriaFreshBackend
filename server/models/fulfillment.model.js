module.exports = (sequelize, Sequelize) => {
    return sequelize.define("fulfillments", {
        quantity: {
            type: Sequelize.INTEGER
        },
    });
};