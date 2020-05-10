
export default class Brick {
  constructor(x,y,gameWidth,gameHeight) {
    this.height = gameHeight*0.05;
    this.width = gameWidth * 0.1;
    this.position = {x: x,
                     y: y};
    this.broken = false;
  }

  draw(ctx) {
    if(this.broken === true)
        return;

    ctx.fillStyle = "brown";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
  }
}