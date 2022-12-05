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
const Schedule = db.schedule;
const Fulfillment = db.fulfillment;

async function initial() {
    // Populate roles table
    await Role.create({
        id: 1,
        name: "producer"
    });

    await Role.create({
        id: 2,
        name: "distributor"
    });

    await Role.create({
        id: 3,
        name: "consumer"
    });

    await Role.create({
        id: 4,
        name: "admin"
    });

    // Populate produce table
    const fruits = [
        "apple",
        "apricot",
        "avocado",
        "banana",
        "bell pepper",
        "blackberry",
        "blueberry",
        "cantaloupe",
        "cherry",
        "clementine",
        "coconut",
        "cranberry",
        "cucumber",
        "fig",
        "grape",
        "grapefruit",
        "honeydew",
        "kiwi",
        "lemon",
        "lime",
        "mango",
        "olive",
        "orange",
        "papaya",
        "peach",
        "pear",
        "pineapple",
        "plum",
        "pomegranate",
        "raisin",
        "raspberry",
        "strawberry",
        "tangerine",
        "tomato",
        "watermelon"
    ];

    const vegetables = [
        "acorn squash",
        "alfalfa sprout",
        "amaranth",
        "anise",
        "artichoke",
        "arugula",
        "asparagus",
        "aubergine",
        "azuki bean",
        "banana squash",
        "basil",
        "bean sprout",
        "beet",
        "black bean",
        "black-eyed pea",
        "bok choy",
        "borlotti bean",
        "broad beans",
        "broccoflower",
        "broccoli",
        "brussels sprout",
        "butternut squash",
        "cabbage",
        "calabrese",
        "caraway",
        "carrot",
        "cauliflower",
        "cayenne pepper",
        "celeriac",
        "celery",
        "chamomile",
        "chard",
        "chayote",
        "chickpea",
        "chives",
        "cilantro",
        "collard green",
        "corn",
        "corn salad",
        "courgette",
        "cucumber",
        "daikon",
        "delicata",
        "dill",
        "eggplant",
        "endive",
        "fennel",
        "fiddlehead",
        "frisee",
        "garlic",
        "gem squash",
        "ginger",
        "green bean",
        "green pepper",
        "habanero",
        "herbs and spice",
        "horseradish",
        "hubbard squash",
        "jalapeno",
        "jerusalem artichoke",
        "jicama",
        "kale",
        "kidney bean",
        "kohlrabi",
        "lavender",
        "leek ",
        "legume",
        "lemon grass",
        "lentils",
        "lettuce",
        "lima bean",
        "mamey",
        "mangetout",
        "marjoram",
        "mung bean",
        "mushroom",
        "mustard green",
        "navy bean",
        "new zealand spinach",
        "nopale",
        "okra",
        "onion",
        "oregano",
        "paprika",
        "parsley",
        "parsnip",
        "patty pan",
        "pea",
        "pinto bean",
        "potato",
        "pumpkin",
        "radicchio",
        "radish",
        "rhubarb",
        "rosemary",
        "runner bean",
        "rutabaga",
        "sage",
        "scallion",
        "shallot",
        "skirret",
        "snap pea",
        "soy bean",
        "spaghetti squash",
        "spinach",
        "squash",
        "sweet potato",
        "tabasco pepper",
        "taro",
        "tat soi",
        "thyme",
        "topinambur",
        "tubers",
        "turnip",
        "wasabi",
        "water chestnut",
        "watercress",
        "white radish",
        "yam",
        "zucchini"
    ];

    const produce = [...fruits, ...vegetables];
    for (const p of produce) {
        await Produce.create({
            name: p.toUpperCase(),
            plantDate: "2020-04-01",
            harvestDate: "2020-09-01",
            unit: "lb"
        });
    }

    // Populate users table
    await User.create({
        username: "producer",
        email: "producer@foo.com",
        password: bcrypt.hashSync("producer", 8)
    });

    await User.create({
        username: "distributor",
        email: "distributor@foo.com",
        password: bcrypt.hashSync("distributor", 8)
    });

    await User.create({
        username: "administrator",
        email: "admin@foo.com",
        password: bcrypt.hashSync("administrator", 8)
    });

    // Create gardeners
    const gardeners = [
        {
            "gardner_id": 1,
            "first_name": "Corinne",
            "last_name": "Bond",
            "producing": [
                {
                    "Corn": "10 lbs",
                    "Green Beans": "25 lbs",
                    "Broccoli": "5 lbs",
                    "Rhubarb": "7 lbs"
                }
            ],
            "expected_yield_date": "08/24/2023"
        },
        {
            "gardner_id": 2,
            "first_name": "Jenny",
            "last_name": "Smiles",
            "producing": [
                {
                    "Corn": "5 lbs",
                    "Potatoes": "15 lbs",
                    "Broccoli": "10 lbs",
                    "Rhubarb": "7 lbs"
                }
            ],
            "expected_yield_date": "06/24/2023"
        },
        {
            "gardner_id": 3,
            "first_name": "Cobie",
            "last_name": "Harris",
            "producing": [
                {
                    "Strawberry": "25 lbs",
                    "Apple": "12 lbs",
                    "Pear": "10 lbs",
                    "Blueberry": "20 lbs"
                }
            ],
            "expected_yield_date": "07/01/2023"
        },
        {
            "gardner_id": 4,
            "first_name": "Ren",
            "last_name": "Simmons",
            "producing": [
                {
                    "Corn": "5 lbs",
                    "Greens": "15 lbs",
                    "Spinach": "30 lbs",
                    "Rhubarb": "7 lbs"
                }
            ],
            "expected_yield_date": "07/16/2023"
        }
    ];

    for (const gardener of gardeners) {
        await User.create({
            username: `${gardener.first_name.toLowerCase()}_${gardener.last_name.toLowerCase()}`,
            email: `${gardener.first_name.toLowerCase()}_${gardener.last_name.toLowerCase()}@foo.com`,
            password: bcrypt.hashSync("gardener", 8)
        });
    }

    // Set user roles
    await User.findByPk(1).then(user => {
        user.setRoles([1]);
    });

    await User.findByPk(2).then(user => {
        user.setRoles([2]);
    });

    await User.findByPk(3).then(user => {
        user.setRoles([4]);
    });

    // Populate distributor table
    await Distributor.create({
        name: "Redeemer Lutheran Church",
        address: "6801 North Allen Road",
        city: "Peoria",
        state: "IL",
        zip: "61614",
        phone: "309-123-4567",
        email: "pfresh@presh.com"
    });

    await Schedule.create({
        distributorId: 1,
        sunday: "Closed",
        monday: "1:00PM - 3:00PM CST",
        tuesday: "Closed",
        wednesday: "Closed",
        thursday: "Closed",
        friday: "9:00AM - 11:00 AM CST",
        saturday: "Closed"
    });

    // Assign users to distributors
    Distributor.findByPk(1).then(distributor => {
        distributor.setUsers([2]);
    });

    // Create a request
    await Request.create({
        quantity: 10,
        distributorId: 1,
        produceId: 1,
    });

    await Request.create({
        quantity: 20,
        distributorId: 1,
        produceId: 2,
    });

    await Request.create({
        quantity: 2,
        distributorId: 1,
        produceId: 1,
    });

    // Create fulfillments for producer user
    for (let i = 0; i < 10; i++) {
        await Fulfillment.create({
            quantity: Math.floor(Math.random() * 10) + 1,
            produceId: Math.floor(Math.random() * produce.length) + 1,
            distributorId: 1,
            userId: 1,
        });
    }

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