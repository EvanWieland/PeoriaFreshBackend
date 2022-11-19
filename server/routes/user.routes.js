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

    // Public
    app.get("/api/public/all", controller.public.allAccess);
    app.get("/api/public/distributors", controller.public.distributors)
    app.get("/api/public/produce", controller.public.produce)

    app.post("/api/public/consumer/request", controller.public.consumerRequest)

    // Consumer
    app.get(
        "/api/test/consumer",
        [authJwt.verifyToken, authJwt.isConsumer],
        controller.consumerBoard
    );

    // Distributor
    app.get(
        "/api/distributor",
        [authJwt.verifyToken, authJwt.isDistributor],
        controller.distributor.distributorBoard
    );

    app.get(
        "/api/distributor/requests",
        [authJwt.verifyToken, authJwt.isDistributor],
        controller.distributor.requests
    );

    // Producer
    app.get(
        "/api/test/producer",
        [authJwt.verifyToken, authJwt.isProducer],
        controller.producerBoard
    );

    // Admin
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};