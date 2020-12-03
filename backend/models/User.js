let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

let userSchema = new mongoose.Schema({
   email: { type: String, require: true, unique: true },
   password: { type: String, require: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);