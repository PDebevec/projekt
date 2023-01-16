const {spawn} = require("child_process")
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

app.get('/' ,(req, res) => {
  res.sendFile(__dirname + '/src/html.html')
})

app.post('/predict/', (req, res) => {
  console.log("predict");
  const child = spawn('python3', ["getnum.py", "pathto.json"])
  console.log(req.body);
  fs.writeFileSync("json.json", req.body, (err) =>{
    console.log(err);
  })
  resdata = []
  
  child.stderr.on('error', (err) => {
    resdata.push(err.message)
  })
  child.stdout.on('data', (data) => {
    resdata.push(data.toString().split('\n')[2].split(' '))
    resdata.push(data.toString().split('\n')[3].split(' '))
  })
  child.kill("SIGKILL")
  res.json(JSON.stringify(resdata))
})

app.get('/draw/', (req, res) => {
  console.log("draw");
  const child = spawn("python3", ["getimg.py", "data"])
  resdata = null
  child.stderr.on('error', (err) => {
    resdata = err.message
  })
  child.on('close', (code) => {
    jsonfile = fs.readFile(jsondata + '.json')
    data = JSON.parse(jsonfile)
    res.json(data)
  })
  child.kill("SIGKILL")
})

const server = https.createServer({key: key, cert: cert, ca: ca}, app)
.listen(4430, () => {
  console.log("https://localhost:4430")
})
/* app.listen(8000, () => {
  console.log("http://localhost:8000")
}) */
//sudo ufw allow 4430/tcp