let multer = require("multer");

let MIME_TYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: ( req, file, callback) => {
        let name = file.originalname.split(" ").join("_");
        let extention = MIME_TYPE(file.mimetype);
        callback(null, name + Date.now() + "." + extention);
    }
});

module.exports = multer({ storage }).single("image");