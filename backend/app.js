let express = require("express");

let app = express();

app.use((req, res) => {
    res.json({ message: "requete reçu!"});
});

module.exports = app;