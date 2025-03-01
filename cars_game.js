$(document).ready(function(){
    // Initializing the main functionality
    drawLines();  // Adds the road lines
    bindEvents();  // Binds user input events
    var intervalId = setInterval(function(){
        animateLines();  // Animates the lines
        moveCar();  // Moves the cars
        check();  // Checks for collisions
    }, 300)  // Executes every 300 milliseconds

    var carTop2 = 10;  // The top position of the second enemy car
    var carTop3 = 20;  // The top position of the third enemy car
    var carLeft2 = 0;  // The left position of the second enemy car
    var carLeft3 = 0;  // The left position of the third enemy car

    // Function to move cars
    function moveCar(){
        carTop2 += 10;
        carTop3 += 12;

        $("#car-2").css("top", carTop2 + "%");
        $("#car-3").css("top", carTop3 + "%");

        let topDistance = Math.abs(carTop2 - carTop3);
        let leftDistance = Math.abs(carLeft2 - carLeft3);

        // If the two cars are too close vertically, push the third car down
        if(topDistance < 20){
            carTop3 += 15;
        }

        // If the cars are too close horizontally, move them apart
        if(leftDistance < 20){
            if(carLeft2 > carLeft3){
                carLeft3 += 10;
            }else{
                carLeft2 += 10;
            }
        }

        // Reset the position of the cars when they move out of view
        if(carTop2 > 90){
            carTop2 = -20;
            let carLeft2 = parseInt(Math.random() * 80);
            $("#car-2").css("left", carLeft2 + "%");
        } 

        if(carTop3 > 90){
            carTop3 = -30;
            let carLeft3 = parseInt(Math.random() * 80);
            $("#car-3").css("left", carLeft3 + "%");
        } 
    }

    var rightCoord = 0;
    // Functions to move the player's car left and right
    function goRight(){
        rightCoord -= 10;
        if(rightCoord < 5){
            rightCoord = 5;
        }
        $("#my_car").css("right", rightCoord + "%");
    }

    function goLeft(){
        rightCoord += 10;
        if(rightCoord > 80){
            rightCoord = 80;
        }
        $("#my_car").css("right", rightCoord + "%");
    }

    // Binding key events for moving the car
    function bindEvents(){
        $("body").keydown(function(e){
            if(e.key == "ArrowRight"){  // Moves the car right
                goRight();
            }else if(e.key == "ArrowLeft"){  // Moves the car left
                goLeft();
            }
        })
    }

    // Draws the road lines
    function drawLines(){
        for(let i = 0; i < 12; i++){
            let sect = $("<section></section>");
            sect.css("top", 80 * + i + "px");
            sect.appendTo("#road");
        }
    }

    // Removes the last line if it goes off the screen
    function removeLastLine(){
        var t = parseInt($("section").last().css("top"))
        if(t > $("#road").height())
            $("section").last().remove();
        var t2 = parseInt($("section").first().css("top"))
        if(t2 < -80)
            $("section").first().remove();
    }

    // Prepend a new road line when the current one goes off the screen
    function prependNewLine(){
        let sect = $("<section></section>");
        let t = $("section").first().css("top");
        let first = parseInt(t) - 80;
        sect.css("top", first + "px");
        sect.prependTo("#road");
        removeLastLine();
    }

    // Animates the road lines
    function animateLines(){
        $("section").each(function(){
            let t = parseInt($(this).css("top"))
            t += 35;
            $(this).css("top", t + "px");
        })
        prependNewLine();
    }

    // Checks for collisions between the player's car and enemy cars
    function check() {
        let c1 = $("#my_car").offset();
        let c2 = $("#car-2").offset();
        let c3 = $("#car-3").offset();

        let w1 = $("#my_car").width();
        let h1 = $("#my_car").height();

        let d1 = Math.abs(c2.left - c1.left);
        let d2 = Math.abs(c2.top - c1.top);

        let d3 = Math.abs(c3.left - c1.left);
        let d4 = Math.abs(c3.top - c1.top);

        let score = 0;
        let scoreInterval = setInterval(() => {
            score++;
            $("#score").text("Score: " + score);
        }, 1000);
    
        // If a collision happens, stop the game
        if (d1 < w1 && d2 < h1 || d3 <w1 && d4 < h1) {
            clearInterval(intervalId);  // Stop the main game loop
            clearInterval(scoreInterval);  // Stop the score update
            // Create explosions at the collision points
            let explosion1 = $("<div class='explosion'></div>");
            let explosion2 = $("<div class='explosion'></div>");
            let explosion3 = $("<div class='explosion'></div>");
    
            // Position explosions on the cars
            explosion1.css({
                top: c1.top - 50,
                left: c1.left - 50
            });
            explosion2.css({
                top: c2.top - 50,
                left: c2.left - 50
            });
            explosion3.css({
                top: c3.top - 50,
                left: c3.left - 50
            });
    
            $("body").append(explosion1);
            $("body").append(explosion2);
            $("body").append(explosion3);

            // Animate the cars moving away from the explosion
            $("#my_car").animate({
                left: c1.left + 50,
                top: c1.top + 50
            }, 500);
    
            $("#car-2").animate({
                left: c2.left - 50,
                top: c2.top - 50
            }, 500);

            $("#car-3").animate({
                left: c3.left - 50,
                top: c3.top - 50
            }, 500);
    
            // Remove explosions after 1 second
            setTimeout(function() {
                explosion1.remove();
                explosion2.remove();
                explosion3.remove();

                alert("GAME OVER!");  // Show game over message
            }, 1000);
        }
    }

    // Restart the game when the restart button is clicked
    $("#restart").click(function() {
        location.reload();  // Reload the page to restart the game
    });
})
