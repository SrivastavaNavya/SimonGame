var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

// To check if the game has started 
var started=false;
var level=0;

// To detect if the keyboard key has been pressed 
$(document).keypress(function(){
        if(!started){
                $('#level-title').text("Level "+level);
                nextSequence();
                started=true;
        }
});

$(".btn").click(function userClick(){

        // id of the colour clicked by the user stored in a variable
        var userChosenColour=this.id;

        // Storing user clicked pattern
        userClickedPattern.push(userChosenColour);

        // Play sound on user selection
        playSound(userChosenColour);
        // $("#"+userChosenColour).click(function(){
        //         new Audio("sounds/"+userChosenColour+".mp3").play();
        // });

        // Call the animate function in userClick function
        animatePress(userChosenColour);

        // Calling function and storing the index of the last answer in the user's sequence
        checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){

        // Once nextSequence function is triggered reset the userClickedPattern to an empty array 
        userClickedPattern=[];

        // Increase the level by 1 everytime the function is called 
        level++;

        // Inside nextSequence(), update the h1 with this change in the value of level.
        $('#level-title').text("Level "+level);

        var randomNumber=Math.floor(Math.random()*4);

        // Generating a random color
        var randomChosenColour=buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        // To flash the buttons
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

        // To play sound when you click the random generated method
        playSound(randomChosenColour);
        // $("#"+randomChosenColour).click(function(){
        //         new Audio("sounds/"+randomChosenColour+".mp3").play();
        // });
}

// To check the answer given by the user 
function checkAnswer(currentLevel){

        // Checking if the most recent answer is same as the game pattern 
        if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
                console.log("Success");

                // If the user has got the most recent answer right then checking that they have finished their sequence 
                if(userClickedPattern.length==gamePattern.length){

                        // Calling nextSequence after 1 sec 
                        setTimeout(() => {
                               nextSequence(); 
                        }, 1000);
                }
        }
        else{
                console.log("Wrong");

                // Playing the sound wrong.mp3 for wrong answer 
                playSound("wrong");

                // Giving a red flash effect for wrong answer 
                $("body").addClass("game-over");
                setTimeout(() => {
                        $("body").removeClass("game-over");
                }, 200);

                // Changing the heading
                $("h1").text("Game Over, Press Any Key To Restart");

                startOver();
        }
}

function startOver(){
        level=0;
        gamePattern=[];
        started=false;
}

function playSound(name){
        var audio=new Audio("sounds/"+name+".mp3");
        audio.play();
}

function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(() => {
              $("#" + currentColour).removeClass("pressed");  
        }, 100);
}

// nextSequence();
// userClick();
