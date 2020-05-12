import Paddle from './paddle.js';
import Ball from './ball.js';
import Brick from './brick.js';

let gameObj = undefined;
function gameLoop(timeStamp) {
    if(gameObj.gameOver) {
        if(gameObj.gameWon)
            gameObj.drawGameWon();
        else
            gameObj.drawGameOver();
        return;
    }

    gameObj.update();
    gameObj.draw();

    requestAnimationFrame(gameLoop);
}

let levels = {1: [[0,1,1,1,0,1,1,1,0,1],
                  [0,1,1,1,0,1,1,1,0,1]]};
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.gameWidth = this.canvas .width;
        this.gameHeight = this.canvas.height;
        this.paddle = new Paddle(this.gameWidth, this.gameHeight);
        this.ball = new Ball(this);
        this.gameOver = false;
        this.gameLevel = 1;
        this.brickObjects = [];
        this.initializeLevel();
        document.addEventListener("keydown", event => {
            //console.log(event.keyCode);
            switch(event.keyCode) {
                case 37:
                case 39:
                    this.paddle.handleKeyDown(event);
                    break;
                case 32:
                    this.restartLevel();
            }
        });

        document.addEventListener("keyup", event => {
            this.paddle.handleKeyUp(event);
        });
    }

    initializeLevel() {
        let brickArr = levels[this.gameLevel];
        for (let r=0; r<brickArr.length; r++) {
            for (let c=0; c<brickArr[r].length; c++) {
                if(brickArr[r][c] === 1)
                    this.brickObjects.push(new Brick(Math.round(c*this.gameWidth*0.1),Math.round(15+(r*this.gameHeight*0.05)),this.gameWidth,this.gameHeight));
            }
        }
    }

    restartLevel() {
        this.paddle.init();
        this.ball.init();
        this.gameOver = false;
        this.gameWon = false;
        this.brickObjects = [];
        this.initializeLevel();
        this.clearCanvas = true;
        requestAnimationFrame(gameLoop);
    }

    draw() {
        if(this.clearCanvas === true) {
            this.context.clearRect(0,0,this.gameWidth,this.gameHeight);
            this.clearCanvas = false;
        }
        //this.context.clearRect(0,0,this.gameWidth,this.gameHeight);
        this.paddle.draw(this.context);
        this.ball.draw(this.context);

        let allBricksBroken = true;
        for(let brick of this.brickObjects) {
            brick.draw(this.context);
            allBricksBroken = allBricksBroken && brick.isBroken;
        }

        if(allBricksBroken) {
            this.gameOver = true;
            this.gameWon = true;
        }

    }

    update() {
        this.paddle.update();
        this.ball.update();
        for(let brick of this.brickObjects)
            brick.update();
    }

    drawGameOver() {
        this.context.font = "30px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText("Game Over", Math.round(this.gameWidth/2), Math.round(this.gameHeight/2));
    }

    drawGameWon() {
        this.context.font = "30px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText("You Won", Math.round(this.gameWidth/2), Math.round(this.gameHeight/2));
    }

}

gameObj = new Game();
gameObj.restartLevel();



