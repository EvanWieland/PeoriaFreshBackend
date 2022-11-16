const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // Test access to public data (e.g. no authentication required)
    app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/test/consumer",
        [authJwt.verifyToken, authJwt.isConsumer],
        controller.consumerBoard
    );

    app.get(
        "/api/test/distributor",
        [authJwt.verifyToken, authJwt.isDistributor],
        controller.distributorBoard
    );

    app.get(
        "/api/test/producer",
        [authJwt.verifyToken, authJwt.isProducer],
        controller.producerBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};