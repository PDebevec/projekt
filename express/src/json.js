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
        url:"/predict",
        dataType: 'json',
        contentType: 'application/json',
        data: jsonstring,
        success: (data) => {
            resdata = JSON.parse(data)
            document.getElementById("number").innerHTML = "prediced " + resdata[0][3]
            document.getElementById("confidence").innerHTML = Math.round(resdata[1][3]*100) + "% confidence"
        },
        error: (xhr, thrownError) => {
            alert(xhr.status)
            alert(thrownError)
        }
    })
    console.log(jsonstring)
    return jsonstring
}

function getNumber(arr2d){
    reqnumber = document.getElementById('reqnumber')
    number = null;
    
    $.ajax({
        type:"get",
        url:"/draw",
        data: reqnumber.toString(),
        sucess: (data) => {
            number = JSON.parse(data)
        },
        error: (xhr, thrownError) => {
            alert(xhr.status)
            alert(thrownError)
        }
    })
    for (var i = 0; i < 28; i++) {
        for(var j = 0; j < 28; j++){
            arr2d[j][i].c = number[i][j]
            arr2d[j][i].rect_draw()
        }
    }
}