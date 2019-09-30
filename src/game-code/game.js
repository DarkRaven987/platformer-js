const setGameOn = () => {

    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');

    canvas.width = 1280;
    canvas.height = 720;

    //ball params
    let dx = 0,
        dy = 1,
        ballX = 150,
        ballY = 150,
        ballRad = 25;
    //floor params
    let floorWidth = canvas.width,
        floorHeight = 35;
    //general params
    let surface = canvas.height - floorHeight;
    let rightWallSurface = canvas.width - 25,
        leftWallSurface = 25;

    //Ball controls
    function keyDownHandler(e) {
        if(e.key === "Right" || e.key === "ArrowRight") {
            dx = 5;
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            dx = -5;
        }else if( e.key === "Up" || e.key === "ArrowUp"){
            dy = -15;
        }
    }

    function keyUpHandler(e) {
        if(e.key === "Right" || e.key === "ArrowRight") {
            dx = 0;
        }
        else if(e.key === "Left" || e.key === "ArrowLeft") {
            dx = 0;
        }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);


    //Ball Draw
    const drawBall = () => {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRad, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    };

    const drawFloor = () => {
        ctx.beginPath();
        ctx.rect(0, canvas.height - floorHeight, floorWidth, floorHeight);
        ctx.fillStyle = "#00c200";
        ctx.fill();
        ctx.closePath();
    };

    const drawWall = (x=0, y=0, width, height) => {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = "#00c200";
        ctx.fill();
        ctx.closePath();
    }

    const ballMovement = () => {
        //Y control logic
        ballY += dy;

        if(ballY + ballRad >= surface) {
            ballY = surface - ballRad;
            dy = -1 * (dy / 1.2);
        }else {
            dy++;
        }

        //X control logic
        ballX += dx;

        if(ballX + ballRad >= rightWallSurface) {
            ballX = rightWallSurface - ballRad;
            dx = -dx;
        }else if (ballX - ballRad <= leftWallSurface) {
            ballX = leftWallSurface + ballRad;
            dx = -dx;
        }
    };

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBall();
        drawFloor();
        drawWall(0, 0, 25, canvas.height - floorHeight);
        drawWall(canvas.width-25, 0, 25, canvas.height - floorHeight);

        ballMovement();

        requestAnimationFrame(draw);
    };

    draw();
};

export {
    setGameOn
}
