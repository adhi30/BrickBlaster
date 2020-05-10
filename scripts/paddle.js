export default class Paddle {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.height = gameHeight*0.02;
    this.bottomPadding = gameHeight*0.01;
    this.width = gameWidth * 0.2;
    this.speed = 0;
    this.maxSpeed = 5;
    this.position = {x: (gameWidth/2) - (this.width/2),
                     y: gameHeight - this.height - this.bottomPadding}
    console.log(gameWidth, gameHeight, this.width, this.height);
    document.addEventListener("keydown", event => {
        switch(event.keyCode) {
            case 37:
                this.speed = -this.maxSpeed;
                break;
            case 39:
                this.speed = this.maxSpeed;
                break;
         }
    });

    document.addEventListener("keyup", event => {
        this.speed = 0;
    });
  }

  draw(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
      let newX = this.position.x + this.speed;
      if(newX < 0)
          newX = 0;
      if((newX + this.width) > this.gameWidth)
          newX = this.gameWidth - this.width;

      this.position.x = newX;
  }
}