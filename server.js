require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const reactViews = require('express-react-views')
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const controller = require('./controllers/logs')


// CONNECTION TO DATABASE (MongoDB)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once("open", () => {
    console.log("Connected to mongoDB")
})


// SET UP ENGINE
app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())


// MIDDLEWARE
app.use((req, res, next) => {
    console.log("Middleware is running for all routes")
    next()
})
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static("public"))


// ROUTES
app.use('/logs', controller)


// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})