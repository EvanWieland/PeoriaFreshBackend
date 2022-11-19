const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./server/models");
const bcrypt = require("bcryptjs");

const app = express();

var corsOptions = {
    origin: [
        "http://localhost:4200",
        "https://peoriafresh.fly.dev"
    ]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to the PeoriaFresh API."});
});

// For testing...
const Role = db.role;
const User = db.user;
const Produce = db.produce;
const Distributor = db.distributor;
const Request = db.request;

function initial() {
    // Populate roles table
    Role.create({
        id: 1,
        name: "producer"
    });

    Role.create({
        id: 2,
        name: "distributor"
    });

    Role.create({
        id: 3,
        name: "consumer"
    });

    Role.create({
        id: 4,
        name: "admin"
    });

    // Populate produce table
    Produce.create({
        name: "Onion",
        plantDate: "2020-04-01",
        harvestDate: "2020-09-01",
        unit: "lb"
    });

    Produce.create({
        name: "Corn",
        plantDate: "2020-04-01",
        harvestDate: "2020-09-01",
        unit: "lb"
    });

    Produce.create({
        name: "Green Bean",
        plantDate: "2020-04-01",
        harvestDate: "2020-09-01",
        unit: "lb"
    });

    // Populate users table
    User.create({
        username: "producer",
        email: "producer@foo.com",
        password: bcrypt.hashSync("producer", 8)
    });

    User.create({
        username: "distributor",
        email: "distributor@foo.com",
        password: bcrypt.hashSync("distributor", 8)
    });

    User.create({
        username: "admin",
        email: "admin@foo.com",
        password: bcrypt.hashSync("admin", 8)
    });

    // Populate distributor table
    Distributor.create({
        name: "Nice Place Produce",
        address: "1234 Main St",
        city: "Peoria",
        state: "IL",
        zip: "61614",
        phone: "309-123-4567",
        email: "pfresh@presh.com"
    });

    Distributor.create({
        name: "Helping Hands",
        address: "1234 Main St",
        city: "Peoria",
        state: "IL",
        zip: "61614",
        phone: "309-123-4567",
        email: "foooo@foo.com",
    });
}

function initialRelations() {
    // Set user roles
    User.findByPk(1).then(user => {
        user.setRoles([1]);
    });

    User.findByPk(2).then(user => {
        user.setRoles([2]);
    });

    User.findByPk(3).then(user => {
        user.setRoles([4]);
    });

    // Assign users to distributors
    Distributor.findByPk(1).then(distributor => {
        distributor.setUsers([2]);
    });

    // Create a request
    Request.create({
        quantity: 10,
        distributorId: 1,
        produceId: 1,
    });

    Request.create({
        quantity: 20,
        distributorId: 1,
        produceId: 2,
    });

    Request.create({
        quantity: 2,
        distributorId: 1,
        produceId: 1,
    });
}

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
}).then(() => {
    db.sequelize.sync().then(() => {
        initialRelations();
    });
});

// end of testing...

// Use this snippet in prod to avoid dropping data
// db.sequelize.sync();

// routes
require('./server/routes/auth.routes')(app);
require('./server/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});