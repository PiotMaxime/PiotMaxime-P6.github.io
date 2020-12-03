let Sauce = require("../models/Sauces");
let fs = require("fs");
const { db } = require("../models/Sauces");

exports.createSauces = (req, res, next) => {
    let sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    let sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: "Objet Validé!" }))
        .catch(error => res.status(400).json({ error }));
}

exports.modifySauces = (req, res, next) => {
    let sauceObject = req.file ?
        { 
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Objet Modifié!" }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            let filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
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

exports.addLikes = (req, res, next) => {
    console.log(req.body.like)
    let like = req.body.like
    let option = {}
    switch(like) {
        case -1:
            console.log("case -1");
            option =
                {
                    $push : { usersDisliked : req.body.userId },
                    $inc: { dislikes : 1 }
                };
            break;
        case 0:
            console.log("case 0");
            //if (user)
            option =
                {
                    $pull : { usersLiked : req.body.userId },
                    $pull : { usersDisliked : req.body.userId },
                    $inc: { likes : -1 },
                    $inc: { dislikes : -1 }
                };
            break;
        case 1:
            console.log("case 1");
            console.log(req.body);
            console.log(db.find());
            option =
                {   
                    $inc : { likes : 1 },
                    $push : { usersLiked : req.body.userId }
                };
            break;
    }
    Sauce.updateOne({ _id: req.params.id }, option)
        .then(() => res.status(200).json({ message: "Objet Liké!" }))      
        .catch(error => res.status(400).json({ error }));
};