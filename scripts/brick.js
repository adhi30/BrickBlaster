
export default class Brick {
  constructor(x,y,gameWidth,gameHeight) {
    this.height = Math.round(gameHeight*0.05);
    this.width = Math.round(gameWidth * 0.1);
    this.position = {x: x,
                     y: y};
    this.isBroken = false;
    this.drawOnNextPass = true;
  }


  draw(ctx) {
    if(this.drawOnNextPass !== true)
        return;

    this.drawOnNextPass = false;

    if(this.isBroken === true) {
        ctx.clearRect(this.position.x, this.position.y, this.width, this.height);
        return;
    }


    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
console.log(ctx.lineWidth);
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "brown";
    ctx.fillRect(this.position.x+1, this.position.y+1, this.width-2, this.height-2);
  }

  update() {
  }
}