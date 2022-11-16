const dataSchema = require("../../models/data")
const jwt = require('jsonwebtoken');

const create = (req, res) => {
    const { drinkName, userId } = req.body
    jwt.verify(userId, process.env.JWT_KEY, function (err, decoded) {
        dataSchema.findOne({ userId: decoded._id }).then(async (data) => {
            await dataSchema.findByIdAndUpdate({ _id: data._id }, drinkName == "monster" ? { monster: Number(data.monster) + Number(150) } : drinkName == "black" ? { black: Number(data.black) + Number(95) } : drinkName == "americano" ? { americano: Number(data.americano) + Number(77) } : drinkName == "sugar" ? { sugar: Number(data.sugar) + Number(260) } : drinkName == "energy" ? { energy: Number(data.energy) + Number(200) } : null, { new: true }).then((data) => {
                res.status(200).send({
                    message: "Consumed Successfully"
                })
            })
        })
    })

}
const get = (req, res) => {
    const { token } = req.headers
    jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
        console.log(decoded._id);
        dataSchema.findOne({ userId: decoded._id?.toString() }).then((data) => {
            res.status(201).send({ data: data })
        })
    })
}

module.exports = { create, get }