const express = require("express")
const fs =require("fs")
const app = express()
const port = 3000

app.listen(port, console.log(`Servidor conectado en puerto ${port}`))

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/canciones", (req, res) => {
    const nuevaCancion = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    canciones.push(nuevaCancion)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
})

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    res.json(canciones)
})

app.delete("/canciones/:id", (req, res) => {
    const {id} = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
})

app.put("/canciones/:id", (req, res) => {
    const {id} = req.params
    const cancionEditada = req.body
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = cancionEditada
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
})