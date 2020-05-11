export default class Paddle {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.height = Math.round(gameHeight*0.02);
    this.bottomPadding = Math.round(gameHeight*0.01);
    this.width = Math.round(gameWidth * 0.2);
    this.maxSpeed = 5;
    this.init();
  }

  init() {
    this.speed = 0;
    this.position = {x: (this.gameWidth/2) - (this.width/2),
                     y: this.gameHeight - this.height - this.bottomPadding};
      this.positionBeforeLastUpdate = {x: this.position.x,
                     y: this.position.y};
  }

  handleKeyDown(event) {
        switch(event.keyCode) {
            case 37:
                this.speed = -this.maxSpeed;
                break;
            case 39:
                this.speed = this.maxSpeed;
                break;
         }
  }

  handleKeyUp(event) {
    this.speed = 0;
  }

  draw(ctx) {
    ctx.clearRect(this.positionBeforeLastUpdate.x,this.positionBeforeLastUpdate.y,this.width,this.height);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
      this.positionBeforeLastUpdate = {x: this.position.x,
                     y: this.position.y};
      let newX = this.position.x + this.speed;
      if(newX < 0)
          newX = 0;
      if((newX + this.width) > this.gameWidth)
          newX = this.gameWidth - this.width;

      this.position.x = newX;
  }
}