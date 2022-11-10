const authSchema = require("../../models/auth")
const dataSchema = require("../../models/data")

const auth = (req, res) => {
    // const { email, name, age } = req.body
    console.log(req.body);
    authSchema.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(200).send({
                message: "Email is already registered"
            })
        }
        else {
            const register = new authSchema(req.body)
            register.save().then(() => {
                const createData = new dataSchema({ monster: 0, black: 0, americano: 0, sugar: 0, energy: 0, userEmail: req.body.email })
                createData.save().then(()=>{
                    res.status(200).send({
                        message: "User Registered"
                    })
                })
            })
        }
    })
}

module.exports = auth