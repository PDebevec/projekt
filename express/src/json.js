function toJson(arr2d) {
    arr2 = []
    for (var i = 0; i < 28; i++) {
        let arr = []
        for(var j = 0; j < 28; j++){
            arr.push(map(arr2d[j][i].c, 0, 255, 0, 255, true))
        }
        arr2.push(arr)
    }
    var jsonstring = JSON.stringify(arr2)
    $.ajax({
        type:"post",
        url:"/predict/py",
        dataType: 'json',
        contentType: 'application/json',
        data: jsonstring,
        success: (data) => {
            jsondata = JSON.parse(JSON.parse(data))
            document.getElementById("su").innerHTML =
            "supervised predicted: <b>" + jsondata.su_predicted + "</b> ... <b>" + Math.round(Number(jsondata.su_confidence)*100) + "% </b>confidence"
            document.getElementById("unsu").innerHTML =
            "unsupervised predicted: <b>" + jsondata.un_predicted + "</b> ... <b>" + Math.round(Number(jsondata.un_confidence)*100) + "% </b>confidence"

            /* document.getElementById("unsu").innerHTML = "unsupervised predicted: <b>" + jsondata.un_predicted_number + "</b>"
            document.getElementById("number").innerHTML = "supervised predicted: <b>" + jsondata.su_predicted + "</b>"
            document.getElementById("confidence").innerHTML = "<b>" + Math.round(Number(jsondata.su_confidence)*100) + "%</b> confidence" */
        },
        error: (xhr, thrownError) => {
            console.log(xhr.status)
            console.log(thrownError)
        }
    })
}

function getNumber(arr2d){
    reqnumber = document.getElementById('reqnumber').value
    
    $.ajax({
        type:"get",
        url:"/draw/py",
        dataType: "json",
        contentType: 'application/json',
        data: { number: reqnumber.toString() },
        success: (data) => {
            number = JSON.parse(JSON.parse(data))
            for (var i = 0; i < 28; i++) {
                for(var j = 0; j < 28; j++){
                    arr2d[j][i].c = number[i][j]
                    arr2d[j][i].rect_draw()
                }
            }
        },
        error: (xhr, thrownError) => {
            console.log(xhr.status)
            console.log(thrownError)
        }
    })
}

function reset(arr2d) {
    document.getElementById("su").innerHTML = "supervised predicted: _ ... __% confidence"
    document.getElementById("unsu").innerHTML = "unsupervised predicted: _ ... __% confidence"
    document.getElementById("reqnumber").value = ""
    arr2d.forEach(arr => {
        arr.forEach(element => {
            element.c = 0
            element.rect_draw()
        });
    });
}

function drawpredicted(arr, arr2d){
    for (let i = 0; i < 28; i++) {
        for (let j = 0; j < 28; j++) {
            arr2d[j][i].c = Number(arr[i][j]) * 255
            arr2d[j][i].rect_draw()
        }
    }
}