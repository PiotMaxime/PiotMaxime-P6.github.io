let express = require("express");
let router = express.Router();
let saucesCtrl = require("../controllers/saucesCtrl");
let auth = require("../middleware/auth");

router.post("/", auth, saucesCtrl.createSauces);
router.put("/:id", auth, saucesCtrl.modifySauces);
router.delete("/:id", auth, saucesCtrl.deleteSauces);
router.get("/:id", auth, saucesCtrl.getOneSauce);

router.get("/", auth, saucesCtrl.getAllSauces);

/*
router.post("/:id/like", (req, res, next) => {

});
*/

module.exports = router;