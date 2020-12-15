let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let User = require("../models/User");
let sanitize = require("mongo-sanitize")


exports.signup = (req, res, next) => {
    let email = sanitize(req.body.email);
    let buffer = Buffer.from(email);
    let emailMask = buffer.toString("base64");
    let password = sanitize(req.body.password);
    bcrypt.hash(password, 10)
        .then(hash => {
            let user = new User({
                email: emailMask,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur Créé!"}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    let email = sanitize(req.body.email);
    let buffer = Buffer.from(email);
    let emailMask = buffer.toString("base64");
    User.findOne({ email: emailMask })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  "RANDOM_TOKEN_SECRET",
                  { expiresIn: "24h" }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };