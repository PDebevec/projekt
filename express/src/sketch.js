let arr2d = [];
p5.disableFriendlyErrors = true

function setup() {
    wah = (innerHeight/1.75)
    createCanvas(wah, wah);
    resolution = 28;
    size = wah / resolution;
    //frameRate(60)
    for(var i = 0; i < resolution; i++){
        let arr = [];
        for(var j = 0; j < resolution; j++){
            arr.push(new rectangle(size*i, size*j, size, size))
        }
        arr2d.push(arr);
    }
    background(255);
    strokeWeight(1);
    stroke(220);
    arr2d.forEach(arr => {
        arr.forEach(element => {
            element.rect_draw();
        });
    });
}

function draw() {
    //console.log(frameRate());
    if(mouseIsPressed){
        arr2d.forEach(arr => {
            arr.forEach(element => {
                let dis= element.distance(mouseX, mouseY);
                let h =  element.height;
                if (dis < h*2) {
                    element.c += map(dis, 0, h, 255, 50, withinBounds=true);
                    element.rect_draw()
                }
            });
        });
    }
}