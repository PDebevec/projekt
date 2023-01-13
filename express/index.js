const {spawn} = require("child_process")
const express = require("express")
const helmet = require("helmet")
const https = require("https")
const fs = require("fs")
const app = express()
app.use(helmet())
const cert = fs.readFile("Certificate/servercert.pem", ()=>{})
const key = fs.readFile("Certificate/key.pem", ()=>{})

app.get('/' ,(req, res) => {
  console.log(req.url);
  res.send('neki')
})

app.post('/predict', (req, res) => {
  const child = spawn('python3', ["getnum.py", "pathto.json"])
  resdata = null
  child.stderr.on('error', (err) => {
    resdata = err.message
  })
  child.stdout.on('data', (data) => {
    resdata = data.toString().split('\n')[2].split(' ')
  })
  child.kill("SIGKILL")
  res.json(JSON.stringify(resdata))
})

app.get('/draw', (req, res) => {
  const child = spawn("python3", ["getimg.py", "data"])
  resdata = null
  child.stderr.on('error', (err) => {
    resdata = err.message
  })
  child.on('close', (code) => {
    jsonfile = fs.readFile('potdo.json')
    data = JSON.parse(jsonfile)
    res.json(data)
  })
  child.kill("SIGKILL")
})

const server = https.createServer({key: key, cert: cert}, app)
.listen("127.0.0.1", 4430, () => {
  console.log("https://localhost:4430")
})