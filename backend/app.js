let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let saucesRoutes = require("./routes/sauces");
let userRoutes = require("./routes/user");

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

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;