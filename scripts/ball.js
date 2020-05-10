export default class Ball {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 2;
    this.bottomPadding = gameHeight*0.01;
    this.width = gameWidth * 0.2;
    this.speed = {x: 1, y: 1};
    this.position = {x: gameWidth/2,
                     y: gameHeight/2};
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
  }

  update() {
      let newX = this.position.x + this.speed.x;
      let newY = this.position.y + this.speed.y;
      if(newX <= 0 || (newX + (this.radius*2)) >= this.gameWidth)
          this.speed.x = this.speed.x * -1;
      if(newY <= 0 || (newY + (this.radius*2)) >= this.gameHeight)
          this.speed.y = this.speed.y * -1;

      newX = newX <= 0 ? 0 : newX;
      newX = (newX + (this.radius*2)) >= this.gameWidth ? (this.gameWidth - (this.radius*2)) : newX


      newY = newY <= 0 ? 0 : newY;
      newY = (newY + (this.radius*2)) >= this.gameHeight ? (this.gameHeight - (this.radius*2)) : newY

      this.position.x = newX;
      this.position.y = newY;
  }
}