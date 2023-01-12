class rectangle{
    constructor(x,y, h,w) {
        this.x = x;
        this.y = y;
        this.height = h;
        this.width = w;
        this.c = 0;
    }

    rect_draw() {
        fill(this.c);
        rect(this.x, this.y, this.height, this.width)
    }

    distance(x, y){
        let distance;
        distance = Math.sqrt(Math.pow((this.x+this.width)-x,2) + Math.pow((this.y+this.height)-y,2));
        return distance;
    }
}