/* const express = require("express")
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

const server = https.createServer({key: key, cert: cert}, app)
.listen("127.0.0.1", 4430, () => {
  console.log("https://localhost:4430")
}) */

const {spawn} = require("child_process")
const { response } = require("express")

/* const child = spawn("python3", ["getimg.py", "data"])
response = null
child.stderr.on('error', (err) => {
  response = err.message
})
child.stdout.on('data', (data) => {
  response = data
})
child.on('close', (code) => {
  console.log(code.toString())
}) */

const child = spawn('python3', ["getnum.py", "pathto.json"])
response = null
child.stderr.on('error', (err) => {
  response = err.message
})
child.stdout.on('data', (data) => {
  response = data
})
child.on('close', (code) => {
  console.log(code.toString())
})