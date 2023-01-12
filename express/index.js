const express = require("express")
const https = require("https")
const fs = require("fs")
const app = express()
const cert = fs.readFile("Certificate/servercert.pem", ()=>{})
const key = fs.readFile("Certificate/key.pem", ()=>{})

app.get('*' ,(req, res) => {
  res.send("neki")
})

const server = https.createServer({key: key, cert: cert}, app)
.listen("127.0.0.1", 443, () => {
  console.log("https://localhost:443")
})