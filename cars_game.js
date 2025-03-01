$(document).ready(function(){
    drawLines();
    bindEvents();
    var intervalId = setInterval(function(){
        animateLines();
        moveCar();
        check();
    }, 300)

    var carTop2 = 10;
    var carTop3 = 20;
    var carLeft2 = 0;
    var carLeft3 = 0;

    function moveCar(){
        carTop2 += 10;
        carTop3 += 12;

        $("#car-2").css("top", carTop2 + "%");
        $("#car-3").css("top", carTop3 + "%");

        let topDistance = Math.abs(carTop2 - carTop3);
        let leftDistance = Math.abs(carLeft2 - carLeft3);

        if(topDistance < 20){
            carTop3 += 15;
        }

        if(leftDistance < 20){
            if(carLeft2 > carLeft3){
                carLeft3 += 10;
            }else{
                carLeft2 += 10;
            }
        }

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

    function bindEvents(){
        $("body").keydown(function(e){
            if(e.key == "ArrowRight"){
                goRight();
            }else if(e.key == "ArrowLeft"){
                goLeft();
            }
        })
    }

    function drawLines(){
        for(let i = 0; i < 12; i++){
            let sect = $("<section></section>");
            sect.css("top", 80 * + i + "px");
            sect.appendTo("#road");
        }
    }

    function removeLastLine(){
        var t = parseInt($("section").last().css("top"))
        if(t > $("#road").height())
            $("section").last().remove();
        var t2 = parseInt($("section").first().css("top"))
        if(t2 < -80)
            $("section").first().remove();
    }

    function prependNewLine(){
        let sect = $("<section></section>");
        let t = $("section").first().css("top");
        let first = parseInt(t) - 80;
        sect.css("top", first + "px");
        sect.prependTo("#road");
        removeLastLine();
    }

    function animateLines(){
        $("section").each(function(){
            let t = parseInt($(this).css("top"))
            t += 35;
            $(this).css("top", t + "px");
        })
        prependNewLine();
    }

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
    
        if (d1 < w1 && d2 < h1 || d3 <w1 && d4 < h1) {
            // Կանգնեցնել խաղը
            clearInterval(intervalId); // intervalId-ն պետք է սահմանված լինի setInterval-ի արդյունքում
            clearInterval(scoreInterval);
            // Բախման պահի պայթյունի ստեղծում
            let explosion1 = $("<div class='explosion'></div>");
            let explosion2 = $("<div class='explosion'></div>");
            let explosion3 = $("<div class='explosion'></div>");

    
            // Պայթյունները տեղադրիր մեքենաների վրա
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

    
            // Անիմացիա մեքենաների տեղաշարժի համար
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
    
            // Ջնջել պայթյունները կարճ ժամանակ անց
            setTimeout(function() {
                explosion1.remove();
                explosion2.remove();
                explosion3.remove();

                alert("GAME OVER!");
            }, 1000); // Ջնջել 1 վայրկյան հետո
        }
    }

    $("#restart").click(function() {
        location.reload(); // Կվերաբեռնի էջը
    });
    
    
})