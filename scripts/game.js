import Paddle from './paddle.js';
import Ball from './ball.js';
let canvas = document.getElementById('gameCanvas');
let context = canvas.getContext('2d');

let gameWidth = canvas .width;
let gameHeight = canvas.height;

context.fillRect(10,10,100,100);

let paddle = new Paddle(gameWidth, gameHeight);
let ball = new Ball(gameWidth, gameHeight);
paddle.draw(context);


function gameLoop(timeStamp) {
  context.clearRect(0,0,gameWidth,gameHeight);
  paddle.update();
  ball.update();

  paddle.draw(context);
  ball.draw(context);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);