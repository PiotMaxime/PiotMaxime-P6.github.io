let Sauce = require("../models/Sauces");
let fs = require("fs");

exports.createSauces = (req, res, next) => {
    let sauceObject = JSON.parse(req.body.thing);
    delete sauceObject._id;
    let sauce = new Sauce({
        ...sauceObject,
        imageURL: `${req.protocol}://${req.get("host")}/images/&{req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Validé!" }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySauces = (req, res, next) => {
    let sauceObject = req.file ?
        { 
            ...JSON.parse(req.body.thing),
            imageURL: `${req.protocol}://${req.get("host")}/images/&{req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params .id })
        .then(() => res.status(200).json({ message: "Objet Modifié!" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => {
            let filename = thing.imageURL.split("/images/")[1];
            fs.unlink(`image/${filename}`, () => {
                Sauce.deletOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Objet Supprimé!" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
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