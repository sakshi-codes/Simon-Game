var buttonColours=["red","blue" ,"green" ,"yellow"];
var gamepattern=[];

var userClickedPattern=[];
var started=false;
var level =0;
var score =0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextsequence();
        started=true;
    }

});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkanswer(userClickedPattern.length-1);

});


function checkanswer(currentlevel){

    if((gamepattern[currentlevel])===(userClickedPattern[currentlevel])){
        if((userClickedPattern.length)==(gamepattern.length)){
            setTimeout(function() {
                score=level;
                nextsequence();
              }, 1000);
        }
    }
    else{
       playSound("wrong");
       $("body").addClass("game-over");
       $("#score").text("Highest Score: "+score);
       $("#level-title").text("Game Over, Press Any Key to Restart");

       setTimeout(function() {
        $("body").removeClass("game-over");
       }, 200);
      
      startover();
    }

}

function nextsequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.random();
    randomNumber=randomNumber*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColour=buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}



function playSound(name){
    var audio= new Audio("sounds/"+name+".mp3");
    audio.play();

}
function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function startover(){
    level =0;
    gamepattern=[];
    started=false;
 }