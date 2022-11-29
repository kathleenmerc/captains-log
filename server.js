const express = require('express')
const app = express()
const PORT = 3000
const reactViews = require('express-react-views')

// SET UP ENGINE
app.set("view engine", "jsx")
app.engine("jsx", reactViews.createEngine())

// NEW
app.get('/logs/new', (req, res) => {
    res.render('New')
})



// LISTENING ON PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})