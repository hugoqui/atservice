const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const connection = mysql.createConnection({
    host: '50.62.209.44',
    user: 'hugoqui',
    password: 'salmo.119.165',
    database: 'atchecker'
})

app.get("/", (req, res) => {
    console.log("Respondiendo desde la ruta")
    res.send("No pos si corre desde el Get General")
})

app.get("/users", (req, res) => {
    const user1 = { Codigo: '3478', Nombre: 'Hugo' }
    const user2 = { Codigo: '3558', Nombre: 'Raul' }
    res.json([user1, user2])
})

app.get('/user/:id', (req, res) => {
    const queryString = "SELECT * FROM Students where Codigo=?"
    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err || rows.length <= 0) {
            res.sendStatus(500)
            throw err
        }
        res.json(rows)
    })
})

app.get('/entradas/:id', (req, res) => {
    const queryString = "SELECT * FROM Entradas where Codigo=?"
    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err || rows.length <= 0) {
            res.sendStatus(500)
            throw err            
        }
        res.json(rows)
    })
})

app.get('/salidas/:id', (req, res) => {
    const queryString = "SELECT * FROM Salidas where Codigo=?"
    const userId = req.params.id
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err || rows.length <= 0) {
            res.sendStatus(500)
            throw err            
        }
        res.json(rows)
    })
})

app.get('/today/:id', (req, res) => {
    // const queryString = "SELECT * FROM Students where Codigo=?"
    // const userId = req.params.id
    // connection.query(queryString, [userId], (err, rows, fields) => {
    //     if (err || rows.length <= 0) {
    //         res.sendStatus(500)
    //         throw err
    //     }
    //     res.json(rows)        
    // })
    const today = new Date
    const m = today.getMonth() + 1
    const finalDate = today.getFullYear() + '-' + m + '-' + today.getDate()
    console.log(finalDate)
    res.end()
})

// app.listen(3000, () => {
//     console.log("Corriendo en el puerto 3000")
// })

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))