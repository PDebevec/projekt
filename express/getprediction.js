const { json } = require("body-parser");

module.exports = {
    predict: (fs, img)=> {
        //console.log(img)
        fs.writeFileSync("json.json", JSON.stringify(img), (err) =>{
            console.log(err);
        })

        return new Promise((resfun) => {

            const {spawn} = require("child_process")
            const child = spawn('python3', ["getnum.py", "json.json"])
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
    },

    image: (num) => {
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
    }
}