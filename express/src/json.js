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
            document.getElementById("number").innerHTML = "predicted: " + jsondata.predicted_number
            document.getElementById("confidence").innerHTML = Math.round(Number(jsondata.predicted_confidence)*100) + "% confidence"
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
    document.getElementById("number").innerHTML = "predicted: _"
    document.getElementById("confidence").innerHTML = "__% confidence"
    document.getElementById("reqnumber").value = ""
    arr2d.forEach(arr => {
        arr.forEach(element => {
            element.c = 0
            element.rect_draw()
        });
    });
}