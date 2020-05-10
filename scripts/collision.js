export default function hasCollisionOccured(ball, gameObj) {

    let ballTopLeft = {x: ball.position.x, y: ball.position.y};
    let ballTopRight = {x: ball.position.x + ball.width, y: ball.position.y};
    let ballBottomLeft = {x: ball.position.x, y: ball.position.y + ball.height};
    let ballBottomRight = {x: ball.position.x + ball.width, y: ball.position.y + ball.height};

    let gameObjTopLeft = {x: gameObj.position.x, y: gameObj.position.y};
    let gameObjTopRight = {x: gameObj.position.x + gameObj.width, y: gameObj.position.y};
    let gameObjBottomLeft = {x: gameObj.position.x, y: gameObj.position.y + gameObj.height};
    let gameObjBottomRight = {x: gameObj.position.x + gameObj.width, y: gameObj.position.y + gameObj.height};

    let hasCollision = false;
    // colliding from bottom side of obstacle
    if(ballTopLeft.y > gameObjTopLeft.y && ballTopLeft.y < gameObjBottomLeft.y) {
        // colliding from left of obstacle
        if(ballTopRight.x > gameObjTopLeft.x && ballTopRight.x < gameObjTopRight.x)
            hasCollision = true;
        // colliding from right of obstacle
        if(ballTopLeft.x < gameObjTopRight.x && ballTopLeft.x > gameObjTopLeft.x)
            hasCollision = true;
    }

    // colliding from top side of obstacle
    if(ballBottomLeft.y > gameObjTopLeft.y && ballBottomLeft.y < gameObjBottomLeft.y) {
        // colliding from left of obstacle
        if(ballBottomRight.x > gameObjTopLeft.x && ballBottomRight.x < gameObjTopRight.x)
            hasCollision = true;
        // colliding from right of obstacle
        if(ballBottomLeft.x < gameObjTopRight.x && ballBottomLeft.x > gameObjTopLeft.x)
            hasCollision = true;
    }

    return hasCollision;
}