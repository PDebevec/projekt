const express = require("express")
const app = express()

app.get('*' ,(req, res) => {
    res.sendFile('src/html.html')
})

app.listen ("127.0.0.1", 443, () => {
  console.log("http://localhost")
})