var directions = {};
var pauseBall = false;
var speed = 4; // paddle speed

function game() {
    $("<div/>").attr("id", "content").appendTo("body")
    $("<div/>").attr("id", "game").appendTo("#content")
    $("<div/>").attr("id", "ball").appendTo("#game")
    $("<div/>").attr("id", "paddleA").attr("class", "paddle").appendTo("#game");
    $("<div/>").attr("id", "paddleB").attr("class", "paddle").appendTo("#game");

    var pA = $("#paddleA");
    var pB = $("#paddleB");

    var ball = {
        speed: 3,
        x: 290,
        y: 140,
        width: $("#ball").width(),
        height: $("#ball").height(),
        directionX: 1,
        directionY: 1
    }

    var paddleA = {
        x1: $("#paddleA").position().left,
        x2: $("#paddleA").position().left + $("#paddleA").width(),
        y1: $("#paddleA").position().top,
        y2: $("#paddleA").position().top + $("#paddleA").height(),
        update: function(){
            this.y1 = $("#paddleA").position().top;
            this.y2 = this.y1 + $("#paddleA").height()
        }
    }

    var paddleB = {
        x1: $("#paddleB").position().left,
        x2: $("#paddleB").position().left + $("#paddleB").width(),
        y1: $("#paddleB").position().top,
        y2: $("#paddleB").position().top + $("#paddleB").height(),
        update: function(){
            this.y1 = $("#paddleB").position().top;
            this.y2 = this.y1 + $("#paddleB").height()
        }
    }

    // Control movement of the ball doing collision checking
    function moveBall() {
        var gameWidth = parseInt($("#game").width());
        var gameHeight = parseInt($("#game").height());

        if (pauseBall) return;

        // Check collision to the bottom border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY > (gameHeight - parseInt($("#ball").height()))) {
            ball.directionY = -1
        }

        // Check collision to the top border and change the moving orientation on Y axis
        if (ball.y + ball.speed * ball.directionY < 0) {
            ball.directionY = 1
        }

        // Check collision to the left border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX > (gameWidth - parseInt($("#ball").width()))) {
            ball.directionX = -1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }

        // Check collision to the right border and change the moving orientation on X axis
        if (ball.x + ball.speed * ball.directionX < 0) {
            ball.directionX = 1
            ball.x = 290;
            ball.y = 140;
            pauseBall = true;
            $("#ball").animate({ "left": ball.x, "top": ball.y }, 2000, function () { pauseBall = false; });
            return;
        }
        //paddleA
        if (ball.x + ball.speed * ball.directionX < paddleA.x2 &&
            ball.x + ball.speed * ball.directionX > paddleA.x1 &&
            ball.y + ball.speed * ball.directionY > paddleA.y1 &&
            ball.y + ball.speed * ball.directionY < paddleA.y2) {
            ball.directionX = 1
        }

        // paddleB 
        if (ball.x + ball.speed * ball.directionX + $("#ball").width() > paddleB.x1 &&
            ball.x + ball.speed * ball.directionX + $("#ball").width() < paddleB.x2 &&
            ball.y + ball.speed * ball.directionY + $("#ball").width() > paddleB.y1 &&
            ball.y + ball.speed * ball.directionY < paddleB.y2) {
            ball.directionX = -1
        }

        // Update ball position on X and Y axes based on speed and orientation
        ball.x += ball.speed * ball.directionX;
        ball.y += ball.speed * ball.directionY;

        // Render the updated ball position
        $("#ball").css({ "left": ball.x, "top": ball.y });
    };

    $('html').keyup(stop).keydown(charMovement);

    function charMovement(e) {
        directions[e.which] = true;
    }

    function stop(e) {
        delete directions[e.which];
    }

    function movepaddleB() {
        for (var i in directions) {

            if (pB.position().top > 0 && i == 38) {
                pB.css("top", (pB.position().top - speed) + "px");
            }

            else if (pB.position().top < ($("#game").height() - pB.height()) && i == 40) {
                pB.css("top", (pB.position().top + speed) + "px");
            }
        }
        //paddleB.y1 = pB.position().top
        //paddleB.y2 = paddleB.y1 + pB.height()
        paddleB.update()
    }

    function movepaddleA() {
        for (var i in directions) {

            if (pA.position().top > 0 && i == 87) {
                pA.css("top", (pA.position().top - speed) + "px");
            }

            if (pA.position().top < ($("#game").height() - pA.height()) && i == 83) {
                pA.css("top", (pA.position().top + speed) + "px");
            }
        }

        //paddleA.y1 = pA.position().top
        //paddleA.y2 = paddleA.y1 + pA.height()
        paddleA.update()
    }

    // Set main loop to be called on the desired frame rate
    setInterval(gameLoop, 1000 / 60);

    // Main loop of the game
    function gameLoop() {
        moveBall();
        movepaddleA();
        movepaddleB();
    }

};