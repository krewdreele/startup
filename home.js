let canvas = document.querySelector("canvas");
 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let l = canvas.getContext('2d');
 
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
// x and y are the coordinates of the circle
// vx and vy are the respective speeds
class Food {
    constructor(x, y){
        this.x = Math.floor(getRandomArbitrary(0.4, 0.6) * innerWidth);
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.radius = 20;
    }

    move() {
    requestAnimationFrame(move);
 
    // It clears the specified pixels within
    // the given rectangle
    l.clearRect(0, 0, innerWidth, innerHeight);
 
    // Creating a circle
    l.beginPath();
    l.strokeStyle = "black";
    l.arc(x, y, radius, 0, Math.PI * 2, false);
    l.stroke();

    x = x + vx;
    y = y + vy;

    if(vy < 7){
    vy = vy + 0.1;
    }
}

}

function addFood(){
    food = new Food()
}

