const mongoose = require("mongoose")

const dataSchema = mongoose.model("data", mongoose.Schema({
    monster: { type: Number },
    black: { type: Number },
    americano: { type: Number },
    sugar: { type: Number },
    energy: { type: Number },
    userId: { type: String },
},
    { timestamps: true }
))

module.exports = dataSchema

