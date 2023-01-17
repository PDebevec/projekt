const express = require("express")
const bodyparser = require("body-parser")
let jsonParse = bodyparser.json()
const helmet = require("helmet")
const https = require("https")
const fs = require("fs")
const app = express()
app.use(helmet())
const cert = fs.readFileSync("Certificate/servercert.pem")
const key = fs.readFileSync("Certificate/key.pem")
const ca  = fs.readFileSync("Certificate/CA/cacert.pem")

app.use(express.static(__dirname + "/src"))

app.get('/' ,(req, res) => {
  res.sendFile(__dirname + '/src/html.html')
})

app.post('/predict/', jsonParse, async (req, res) => {
  const { predict } = require("./getprediction")
  res.json(await predict(fs, req.body))
})

app.get('/draw/', jsonParse, async (req, res) => {
  const { image } = require("./getprediction")
  res.json(await image(req.query.number))
})

https.createServer({key: key, cert: cert, ca: ca}, app)
.listen(4430, () => {
  console.log("https://localhost:4430")
})
/* app.listen(8000, () => {
  console.log("http://localhost:8000")
}) */