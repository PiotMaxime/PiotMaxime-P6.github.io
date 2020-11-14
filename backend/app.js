let express = require("express");
let bodyParser = require("body-parser");
let object = require("./models/object");
let mongoose = require("mongoose");

mongoose.connect('mongodb+srv://Admin1:0isyvZgbD4j3NTcy@clusterp6.2s0rr.mongodb.net/ClusterP6?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

let app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post("/api/sauces", (req, res, next) => {

});

app.post("/api/auth/signup", (req, res, next) => {

});

app.post("/api/login", (req, res, next) => {

});

app.get("/api/sauces", (req, res, next) => {

});

app.get("/api/sauces/:id", (req, res, next) => {

});

app.put("/api/sauces/:id", (req, res, next) => {

});

app.delete("/api/sauces/:id", (req, res, next) => {

});

app.post("/api/sauces/:id/like", (req, res, next) => {

});

module.exports = app;