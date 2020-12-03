let express = require("express");
let router = express.Router();
let saucesCtrl = require("../controllers/saucesCtrl");
let auth = require("../middleware/auth");
let multer = require("../middleware/multer-config");


router.get("/", auth, saucesCtrl.getAllSauces);
router.post("/", auth, multer, saucesCtrl.createSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);
router.post("/:id/like", auth, saucesCtrl.addLikes);


module.exports = router;