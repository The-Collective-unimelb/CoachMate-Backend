require('dotenv').config()
const express = require('express')
const app = express()

require('./models/db').connectDb()
require('./models/db').initUsers()
app.listen(3000, () => {
    console.log("Listening on 3000")
})