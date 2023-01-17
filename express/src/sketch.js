let arr2d = [];
//p5.disableFriendlyErrors = true
wah = (innerHeight/1.5)
sizepx = wah / 28

function setup() {
    createCanvas(wah+1, wah+1)
    //frameRate(60)
    for(var i = 0; i < 28; i++){
        let arr = [];
        for(var j = 0; j < 28; j++){
            arr.push(new rectangle(sizepx*i, sizepx*j, sizepx, sizepx))
        }
        arr2d.push(arr);
    }
    background(255);
    strokeWeight(1);
    stroke(220);
    arr2d.forEach(arr => {
        arr.forEach(element => {
            element.rect_draw()
        });
    });
}

function draw() {
    //console.log(frameRate())
    if(mouseIsPressed){
        if((mouseX < wah && mouseX > 0) && (mouseY < wah && mouseY > 0)){
            arr2d.forEach(arr => {
                arr.forEach(element => {
                    let dis= element.distance(mouseX, mouseY)
                    let h =  element.height
                    if (dis < h*1.5) {
                        element.c += map(dis, 0, h, 255, 30, withinBounds=true)
                        element.rect_draw()
                    }
                })
            })
        }
    }
}
