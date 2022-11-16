exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.consumerBoard = (req, res) => {
    res.status(200).send("Consumer Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.distributorBoard = (req, res) => {
    res.status(200).send("Distributor Content.");
};

exports.producerBoard = (req, res) => {
    res.status(200).send("Producer Content.");
};