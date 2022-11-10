const dataSchema = require("../../models/data")

const create = (req, res) => {
    const { drinkName } = req.body
    dataSchema.findOne({ email: req.body.email }).then(async (data) => {
        await dataSchema.findByIdAndUpdate({ _id: data._id }, drinkName == "monster" ? { monster: data.monster + Number(75) } : drinkName == "black" ? { black: data.black + Number(75) } : drinkName == "americano" ? { americano: data.americano + Number(75) } : drinkName == "sugar" ? { sugar: data.sugar + Number(75) } : drinkName == "energy" ? { energy: data.energy + Number(75) } : null).then(() => {
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