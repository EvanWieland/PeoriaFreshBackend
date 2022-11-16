const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./server/models");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
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

function initial() {
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
}

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
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