module.exports = {
    /* predict: (fs, img, token)=> {
        //console.log(img)
        fs.writeFileSync("jsonImage/"+token+".json", JSON.stringify(img), (err) =>{
            console.log(err);
        })

        return new Promise((resfun) => {

            const {spawn} = require("child_process")
            const child = spawn('python3', ["getnum.py", "jsonImage/"+token.toString()+".json"])
            resdata = null
            child.stderr.on('data', (data) => {
                //console.log(data.toString());
                resdata = data.toString()
            })
            child.stdout.on('data', (data) => {
                resdata = data.toString()
            })
            child.on('exit', (code) => {
                console.log("POST request code: " + code);
                resfun(JSON.stringify(resdata))
            })
        })
    }, */

    /* image: (num) => {
        return new Promise((resfun) => {
            const {spawn} = require("child_process")
            const child = spawn("python3", ["getimg.py", num.toString()])
            resdata = null
            child.stderr.on('error', (err) => {
                resdata = err.message
            })
            child.stdout.on('data', (data) => {
                resdata = data.toString()
            })
            child.on('exit', (code) => {
                console.log("GET request code: " + code)
                resfun(JSON.stringify(resdata))
            })
        })
    }, */

    predict2: (data) => {
        return new Promise((resfun) => {
            const http = require("http")
            let req = http.request({
                hostname: "localhost",
                port: 8000,
                path: "/predict",
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': JSON.stringify(data).length,
                }
            }, (res) => {
                res.on('data', (chunk) => {
                    resfun(JSON.stringify(chunk.toString()))
                })
            })
            req.write(JSON.stringify(data))
            req.end()
        })
    },

    image2 : (data) => {
        return new Promise((resfun) => {
            const http = require("http")
            let req = http.request({
                hostname: "localhost",
                port: 8000,
                path: "/image",
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': JSON.stringify(data).length,
                }
            }, (res) => {
                res.on('data', (chunk) => {
                    resfun(JSON.stringify(chunk.toString()))
                })
            })
            req.write(JSON.stringify(data))
            req.end()
        })
    }
}