let Sauce = require("../models/Sauces");

exports.createSauces = (req, res, next) => {
    delete req.body._id;
    let sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Validé!" }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySauces = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params .id })
        .then(() => res.status(200).json({ message: "Objet Modifié!" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.deletOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet Supprimé!" }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};