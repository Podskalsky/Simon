let buttonColors = ["red", "blue", "green", "yellow"]; 

let gamePattern = [];
let userPattern = [];

let started = false;
let level = 0;

function nextSequence() {
  
    userPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeOut(100).fadeIn(100);

    playSound(randomColor);

}


function checkMove(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
} 

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");}, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}



function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {$("#" + currentColor).removeClass("pressed");}, 100);
}

$(".btn").click(function() {
    let userColor = $(this).attr("id");
    userPattern.push(userColor);
    console.log(userPattern);

    playSound(userColor);
    animatePress(userColor);

    checkMove(userPattern.length - 1);
}); 

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});
