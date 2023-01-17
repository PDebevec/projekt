const session = require("express-session")
const cookie = require("cookie-parser")
const crypto = require("crypto")
const express = require("express")
const helmet = require("helmet")
const https = require("https")
const fs = require("fs")
const app = express()
app.use(helmet())
const cert = fs.readFileSync("Certificate/servercert.pem")
const key = fs.readFileSync("Certificate/key.pem")
const ca  = fs.readFileSync("Certificate/CA/cacert.pem")

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
  if(req.session.token == null){
    req.session.token = crypto.randomBytes(16).toString('hex')
    sessions.push(req.session)
  }
  res.sendFile(__dirname + '/src/html.html')
})

app.post('/predict/', async (req, res) => {
  const { predict } = require("./getprediction")
  res.json(await predict(fs, req.body, req.session.token))
})

app.get('/draw/', async (req, res) => {
  const { image } = require("./getprediction")
  res.json(await image(req.query.number))
})

let sessions = []
setInterval(() => {
  if(session.length > 100){
    sessions.slice(sessions.length-100)
  }
  sessions.forEach((sess, i, obj) => {
    if(sess.cookie.expires < (new Date).getTime()){
      sess.destroy()
      obj.splice(i, 1)
    }
  })
}, 30000);

https.createServer({key: key, cert: cert, ca: ca}, app)
.listen(4430, () => {
  console.log("https://localhost:4430")
})


/* app.listen(8000, () => {
  console.log("http://localhost:8000")
}) */