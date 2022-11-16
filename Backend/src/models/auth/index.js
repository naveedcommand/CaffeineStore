const mongoose = require("mongoose")

const authSchema = mongoose.model("auth", mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
},
    { timestamps: true }
))

module.exports = authSchema

