const express = require("express")
const app = express()
require('dotenv').config()
app.use(require("cors")())
app.use(express.json())
// PORT 
const { PORT } = process.env

// DATABASE CONNECT 

require("./src/db")



// API
app.use("/api/auth", require("./src/routes/auth"))
app.use("/api/data", require("./src/routes/data"))

// LISTEN 

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})

