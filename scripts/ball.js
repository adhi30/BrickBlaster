import hasCollisionOccured from './collision.js';
export default class Ball {
  constructor(gameObj) {
    this.gameObj = gameObj;
    this.gameWidth = gameObj.gameWidth;
    this.gameHeight = gameObj.gameHeight;
    this.radius = 2;
    this.bottomPadding = this.gameHeight*0.01;
    this.height = this.radius * 2;
    this.width = this.radius * 2;
    this.init();
  }

  init() {
    this.speed = {x: 1, y: 1};
    this.position = {x: this.gameWidth/2,
                     y: this.gameHeight/2};
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI, false);
    ctx.fill();
    //console.log(this.position.x, this.position.y);
  }

  update() {
      // collision with walls
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

      // collision with paddle. Can happen only with top of paddle. So, just reverse y speed.
      if(hasCollisionOccured(this, this.gameObj.paddle)) {
          this.speed.y = this.speed.y * -1;
          this.position.y = this.gameObj.paddle.position.y - this.height;
      }

      // collision with bricks
      for (let brick of this.gameObj.brickObjects) {
          if(brick.broken === false && hasCollisionOccured(this, brick)) {
              this.speed.y = this.speed.y * -1;
              brick.broken = true;
          }
      }
      if(this.position.y > this.gameObj.paddle.position.y)
          this.gameObj.gameOver = true;
  }
}