const mongoose = require("mongoose")
const { DATA_BASE_URL } = process.env

mongoose.connect(DATA_BASE_URL).then(() => console.log("Database Connected")).catch((err) => console.log(err))