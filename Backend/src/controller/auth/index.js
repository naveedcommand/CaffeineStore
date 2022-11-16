const authSchema = require("../../models/auth")
const dataSchema = require("../../models/data")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const hash = 10
const register = (req, res) => {
    authSchema.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.status(200).send({
                message: "Email is already registered"
            })
        }
        else {
            bcrypt.hash(req.body.password, hash, function (err, hash) {
                if (!err) {
                    req.body.password = hash
                    const register = new authSchema(req.body)
                    register.save().then(async (data) => {
                        const token = await jwt.sign({ _id: data._id }, process.env.JWT_KEY)
                        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
                            console.log(decoded)
                            if (!err) {
                                const createData = new dataSchema({ monster: 0, black: 0, americano: 0, sugar: 0, energy: 0, userId: decoded._id })
                                createData.save().then(() => {
                                    res.status(200).send({
                                        message: "User Registered",
                                        token
                                    })
                                })
                            }
                        })
                    })
                }
            });

        }
    })
}

const login = async (req, res) => {
    authSchema.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, async (err, result) => {
                console.log(result);
                if (!err) {
                    const token = await jwt.sign({ _id: user._id }, process.env.JWT_KEY)
                    if (token) {
                        res.status(200).send({
                            message: "User Registered",
                            token
                        })
                    }
                }
            });
        }
        else {
            res.status(200).send({
                message: "Email is not registered"
            })
        }
    }).catch((err) => console.log(err))
}

module.exports = { register, login }