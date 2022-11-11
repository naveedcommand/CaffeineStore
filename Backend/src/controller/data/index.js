const dataSchema = require("../../models/data")

const create = (req, res) => {
    const { drinkName } = req.body
    console.log(drinkName);
    dataSchema.findOne({ userEmail: req.body.userEmail }).then(async (data) => {
        await dataSchema.findByIdAndUpdate({ _id: data._id }, drinkName == "monster" ? { monster: Number(data.monster) + Number(75) } : drinkName == "black" ? { black: Number(data.black) + Number(95) } : drinkName == "americano" ? { americano: Number(data.americano) + Number(77) } : drinkName == "sugar" ? { sugar: Number(data.sugar) + Number(130) } : drinkName == "energy" ? { energy: Number(data.energy) + Number(200) } : null, { new: true }).then((data) => {
            res.status(200).send({
                message: "Data Stored"
            })
        })
    })
}
const get = (req, res) => {
    const { email } = req.headers
    dataSchema.findOne({ userEmail: email }).then((data) => res.status(201).send({ data: data }))
}

module.exports = { create, get }