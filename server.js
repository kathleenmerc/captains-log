require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const reactViews = require('express-react-views')
const mongoose = require('mongoose')
const Log = require('./models/logs')

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

app.use(express.urlencoded({extended:false}))

// INDEX
app.get('/logs', (req, res) => {
    Log.find({}, (err, allLogs) => {
        if (!err) {
            res.render('Index', { logs: allLogs } )
        } else {
            res.send(err)
        }
    })
})

// NEW
app.get('/logs/new', (req, res) => {
    res.render('New')
})

// CREATE
app.post('/logs', (req, res) => {
    if (req.body.shipIsBroken === "on") {
        req.body.shipIsBroken = true
    } else {
        req.body.shipIsBroken = false
    }
    Log.create(req.body, (err, createdLog) => {
        if (!err) {
            res.redirect('/logs')
        } else {
            res.send(err)
        }
    })
})

// SHOW
app.get('/:id', (req, res) => {
    Log.findById(req.params.id, (error, foundLog) => {
        if (!error) {
            res.render('logs/Show', { logs: foundLog } )
        }
    })
})



// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})