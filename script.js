const buttonColors = ["green","red","blue","yellow"]
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

$(document).keypress( function(){
    if(!started){
        $("#level-title").text("Level "+ level)
        nextSequence();
        started = true;
    }
})
function playsound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userPattern[currentLevel]){
        if (userPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else{
        playsound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}
$(".btn").on("click",function(){
    const userChoosenColor = this.getAttribute("id");
    userPattern.push(userChoosenColor);
    playsound(userChoosenColor);
    animatePress(userChoosenColor)
    checkAnswer(userPattern.length-1)
});

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random()*4);
    const choosenColor = buttonColors[randomNumber];
    gamePattern.push(choosenColor);
    $("#" + choosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(choosenColor);
}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;
}