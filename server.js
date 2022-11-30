require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 3000
const reactViews = require('express-react-views')
const mongoose = require('mongoose')
const Log = require('./models/logs')
const methodOverride = require("method-override")


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
app.use(methodOverride('_method'))
app.use(express.static("public"))


// SEED ROUTE
app.get('/logs/seed', (req, res) => {
    const startLogs = [
        {
            title: "Windy Day",
            entry: "It was a very windy day. Our sail malfunctioned and still needs to be looked at.",
            shipIsBroken: true
        },
        {
            title: "Smooth Sailing",
            entry: "No problems and perfect weather today.",
            shipIsBroken: false
        },
        {
            title: "Rest Day",
            entry: "Docked the ship, and went to town to relax a bit.",
            shipIsBroken: false
        }
    ]

    Log.deleteMany({}).then((data) => {
        Log.create(startLogs).then((data) => {
            res.json(data)
        })
    })
})

// INDEX
app.get('/logs', async (req, res) => {
    try {
        const logs = await Log.find({})
        res.render('Index', { logs })
    } catch (err) {
        res.send(err)
    }


    // Log.find({}, (err, allLogs) => {
    //     if (!err) {
    //         res.render('Index', { logs: allLogs } )
    //     } else {
    //         res.send(err)
    //     }
    // })
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
app.get('/logs/:id', (req, res) => {
    Log.findById(req.params.id, (err, foundLog) => {
        if (!err) {
            res.render('Show', { log: foundLog } )
        } else {
            res.send(err)
        }
    })
})



// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})