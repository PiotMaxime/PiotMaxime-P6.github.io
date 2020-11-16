let express = require("express");
let router = express.Router();
let userCtrl = require("../controllers/saucesCtrl");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;