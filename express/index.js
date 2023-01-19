const session = require("express-session")
const cookie = require("cookie-parser")
const crypto = require("crypto")
const express = require("express")
const helmet = require("helmet")
const https = require("https")
const fs = require("fs")
const app = express()
const cert = fs.readFileSync("../Certificate/servercert.pem")
const key = fs.readFileSync("../Certificate/key.pem")
const ca  = fs.readFileSync("../Certificate/CA/cacert.pem")

app.use(helmet())
app.use(helmet.hidePoweredBy())
/* app.use(helmet.contentSecurityPolicy({
  directives: {
    
  }
})) */
app.use(express.static(__dirname + "/src"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookie())
app.use(session({
  secret: crypto.randomBytes(64).toString('hex'),
  saveUninitialized: true,
  cookie: { maxAge: 1000*60*60*6},
  resave: false
}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/src/html.html')
})

app.post('/predict/py', async (req, res) => {
  const { predict2 } = require("./getprediction")
  res.json(await predict2(req.body))
})

app.get('/draw/py', async (req, res) => {
  const { image2 } = require("./getprediction")
  res.json(await image2(req.query.number))
})

https.createServer({key: key, cert: cert, ca: ca}, app)
.listen(4430, () => {
  console.log("https://localhost:4430")
})

/* app.post('/predict/', async (req, res) => {
  const { predict } = require("./getprediction")
  res.json(await predict(fs, req.body, req.session.token))
}) */

/* app.get('/draw/', async (req, res) => {
  const { image } = require("./getprediction")
  res.json(await image(req.query.number))
}) */

/* app.listen(8000, () => {
  console.log("http://localhost:8000")
}) */