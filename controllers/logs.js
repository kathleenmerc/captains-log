const express = require('express')
const router = express.Router()
const Log = require('../models/logs')

// I.N.D.U.C.E.S
// Index, New, Delete, Update, Create, Edit, Show

// SEED ROUTE
router.get('/seed', (req, res) => {
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


// INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        const logs = await Log.find({})
        res.render('Index', { logs })
    } catch (err) {
        res.send(err)
    }
})

// Index Route (.then method)
// router.get('/', (req, res) => {
//     Log.find({})
//         .then((fruits) => {
//             res.render('Index', { fruits })
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })


// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('New')
})


// DELETE ROUTE
router.delete('/:id', async (req, res) => {
    try {
        const deletedLog = await Log.findByIdAndDelete(req.params.id)
        res.redirect('/logs')
    } catch (err) {
        res.send(err)
    }
})

// Delete Route (.then method)
// router.delete('/:id', (req, res) => {
//     Log.findByIdAndDelete(req.params.id)
//         .then((log) => {
//             res.redirect('/logs')
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })


// UPDATE ROUTE
router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false
        await Log.findByIdAndUpdate(id, req.body)
        res.redirect(`/logs`)
    } catch (err) {
        res.send(err)
    }
})


// CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        req.body.shipIsBroken = req.body.shipIsBroken === "on" ? true : false
        const createdLog = await Log.create(req.body)
        res.redirect('/logs')
    } catch (err) {
        res.send(err)
    }
})

// Create route (.then method)
// router.post('/', (req, res) => {
//     if (req.body.shipIsBroken === "on") {
//         req.body.shipIsBroken = true
//     } else {
//         req.body.shipIsBroken = false
//     }
//     Log.create(req.body, (err, createdLog) => {
//         if (!err) {
//             res.redirect('/logs')
//         } else {
//             res.send(err)
//         }
//     })
// })


// EDIT ROUTE
// router.get('/:id/edit', async (req, res) => {
//     try {
//         await Log.findById(req.params.id)
//         res.render('Edit', { log })
//     } catch (err) {
//         res.send(err)
//     }
// })


// Edit Route (.then method)
router.get('/:id/edit', (req, res) => {
    Log.findById(req.params.id)
        .then((log) => {
            res.render('Edit', { log })
        })
        .catch((err) => {
            res.send(err)
        })
})



// SHOW ROUTE
router.get('/:id', async (req, res) => {
    try {
        const log = await Log.findById(req.params.id)
        res.render('Show', { log })
    } catch (err) {
        res.send(err)
    }
})

// Show Route (.then method)
// router.get(':id', (req, res) => {
//     Log.findById(req.params.id, (err, foundLog) => {
//         if (!err) {
//             res.render('Show', { log: foundLog })
//         } else {
//             res.send(err)
//         }
//     })
// })

module.exports = router