const express = require('express')
const app = express()
const PORT = 3000
const reactViews = require('express-react-views')
const mongoose = require('mongoose')

// SET UP ENGINE
app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())

// MIDDLEWARE
app.use((req, res, next) => {
    console.log("Middleware is running for all routes")
    next()
})

app.use(express.urlencoded({extended:false}))

// CREATE
app.post('/logs', (req, res) => {
    if (req.body.shipIsBroken === "on") {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    res.send(req.body)
})

// NEW
app.get('/logs/new', (req, res) => {
    res.render('New')
})



// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})