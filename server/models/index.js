const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.produce = require("../models/produce.model.js")(sequelize, Sequelize);
db.request = require("./request.model.js")(sequelize, Sequelize);
db.distributor = require("../models/distributor.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.distributor.belongsToMany(db.user, {
    through: "distributor_users"
});

db.user.belongsToMany(db.distributor, {
    through: "distributor_users"
});

db.distributor.hasMany(db.request);

db.produce.hasMany(db.request);

db.request.belongsTo(db.distributor);

db.ROLES = ["producer", "admin", "distributor", "consumer"];

module.exports = db;