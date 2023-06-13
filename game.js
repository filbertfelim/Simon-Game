var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var randomNumber = Math.floor(Math.random() * 4);

var randomChosenColour = buttonColours[randomNumber];

var level = 0;

var started = false;

var gameover = false;

var audio = new Audio("sounds/" + randomChosenColour + ".mp3");

var highscore = 0;

function animatePress(currentColour) {
  $("div.btn." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("div.btn." + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").html("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("div.btn." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] == gamePattern[currentLevel - 1]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // game over
    started = false;
    gameover = true;
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over! Press Any Key or Click to Restart");
    $("#level-title").after("<h2 id='score-title'>Level achieved : </h2>");
    $("#score-title").append(level - 1);
    if (level - 1 >= highscore) {
      $("div.row.high-score").empty();
      $("div.row.high-score").append(
        "<h3 class='high-score'>Highest score : </h3>"
      );
      $("h3.high-score").append(level - 1);
      highscore = level - 1;
    }
  }
  console.log(userClickedPattern);
  console.log(gamePattern);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  gameover = false;
}
$("div.btn").click(function () {
  if (started && !gameover) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length);
  }
});

$(document).on("keypress", function () {
  if (!started && !gameover) {
    $("#score-title").remove();
    nextSequence();
    started = true;
  } else if (!started && gameover) {
    startOver();
  }
});

$(document).on("click", function () {
  if (!started && !gameover) {
    $("#score-title").remove();
    nextSequence();
    started = true;
  } else if (!started && gameover) {
    startOver();
  }
});
