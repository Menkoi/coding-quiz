// elements 
var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart");
var quizBox = document.querySelector(".quiz-box");
var option_list = document.querySelector(".option-list");
var timeCount = quizBox.querySelector(".timer .timer-sec");
var timeOff = quizBox.querySelector("header .time-text");
var result_box = document.querySelector("result-box");
var submitBtn = document.querySelector("result-box .submit");
var mainEl = document.querySelector("#details");

var next_btn = quizBox.querySelector(".next-btn");
var result_box = document.querySelector(".result-box");
var replay_quiz = result_box.querySelector(".buttons .replay-quiz");

let que_count = 0;
let que_numb = 1;
let counter;
var time = 70;
let widthValue = 0;
let userScore = 0;
let timeSub = -10;

// start quiz button clicked
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo");
}

// exit quiz button clicked
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
}

// continue quiz button clicked
continueBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz"); // show quiz box 
    showQuestions(0);
    queCounter(1);
    startTimer(time);
}

replay_quiz.onclick = ()=>{
    window.location.reload();
}

//if next button clicked
next_btn.onclick = ()=>{
if(que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showQuestions(que_count)
    queCounter(que_numb);
    next_btn.style.display  = "none";
    timeOff.textContent = "Time Left";
} else{
    setInterval(counter);
    console.log("Questions Complete");
    showResultBox();
 }
}

// question and options from array
function showQuestions(index) {
    var que_text = document.querySelector(".que-text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                     + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                     + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                     + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    var option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}

function optionSelected(answer){

    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
    console.log("Answer is Correct");
    answer.classList.add("correct");
    } else { 
        
        //time -= 10;
        //setInterval(time, 1000);
        //timeCount.textContent = time;
        //startTimer(time);

        //console.log(time);

     

        //if (timeSub > 0) {
            
            ///stopInterval(counter);
            //clearInterval(counterLine);
            //timeCount.textContent = "0";
            //timeOff.textContent = "Time Off";
            
            //showResultBox();
        //}

        answer.classList.add("incorrect",);
        console.log("Answer is wrong");

         //if answers is incorrect then auto select the correct answert
         for(let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct")
            }
         }
    }
    // user select, disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disable");
    }
    next_btn.style.display  = "block";
  
}

function showResultBox(){
    clearInterval(counter);
    next_btn.style.display  = "none";
    infoBox.classList.remove("activeInfo");
    //quizBox.classList.add("activeQuiz"); // show quiz box 
    result_box.classList.add("activeResult"); // show result box
    var scoreText = result_box.querySelector(".score-text"); 
    
    if(userScore > 3){
        let scoreTag = '<span>Congrats! you got ' + userScore + ' out of ' + questions.length +'</span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){ 
        let scoreTag = '<span> nice! you got ' + userScore + ' out of ' + questions.length + '</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>you got ' + userScore + ' out of ' + questions.length + '</span>';
        scoreText.innerHTML = scoreTag;
    }
    
     // creates input for user to add initials
  //let par = document.createElement("p");

  let initialsInput = document.createElement("input");
  initialsInput.setAttribute("id","userInitials");
  initialsInput.setAttribute("name","userInitials");
  initialsInput.setAttribute("minlength","3");
  initialsInput.setAttribute("maxlength","3");
  initialsInput.setAttribute("size","3");

  mainEl.appendChild(initialsInput);
  //mainEl.appendChild(par);
  
  // lets user input 3 letters and makes them uppercase
  initialsInput.addEventListener("input", function() {
    initialsInput.value = initialsInput.value.toUpperCase();
    if ( initialsInput.value.length === 3 ) {
        initialsInput.disabled = true;

    //create object for this score
    let thisScore = [
         {
              name: initialsInput.value, 
              score: userScore 
            } 
        ]

    // get high score from memory
    let storedScores = JSON.parse(localStorage.getItem("highScores"));
    console.log("local storage storedScores", storedScores); //works

    if(storedScores !== null) {
        storedScores.push (thisScore[0]);
        
    } else {
        storedScores = thisScore;
    }

    localStorage.setItem("highScores", JSON.stringify(storedScores));
    
       highScores();
    }
  });
}

function highScores() {

    let heading = document.createElement("h2");
    heading.setAttribute("id","main-heading");
    heading.textContent = "Top 5 High Scores";

    mainEl.appendChild(heading);

    var clearHighScoresBtn = document.createElement('button');
    clearHighScoresBtn.innerText = 'Clear Highscore';
    clearHighScoresBtn.style.height =  "40px";
    clearHighScoresBtn.style.backgroundColor = "rgb(103, 189, 230)";
    clearHighScoresBtn.style.borderRadius = "5px";
    clearHighScoresBtn.style.fontWeight = "bold";
    clearHighScoresBtn.style.fontSize = "16px";
    clearHighScoresBtn.style.color = "white";
    clearHighScoresBtn.style.border = "rgb(103, 189, 230)"

    mainEl.appendChild(clearHighScoresBtn);
    
    // get scores from storage
    let storedScores = JSON.parse(localStorage.getItem("highScores"));
    console.log("functions stored scores works", storedScores); //works


    //check for this error
    if (storedScores !== null) {

    //sort scores
    storedScores.sort((a,b) => {return a.Score < b.Score ? 1: -1});
    

    //shows number of scores of played games
    let numScoresDisplay = 5;
    if(storedScores.length < 5) {
        numScoresDisplay = storedScores.length;
        console.log("num score display works",numScoresDisplay);
    }

    for (var i = 0; i < numScoresDisplay; i++) {
        var s = storedScores[i];
  
        var p = document.createElement("p"); // working
        p.textContent = s.name + " " + ":" + " " + s.score;
        mainEl.appendChild(p);
      }
    } 

    clearHighScoresBtn.addEventListener("click", function(){
        window.localStorage.removeItem("highScores");
        clearHighScoresBtn.innerHTML = "High Scores Cleared!";
    });
}

function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time;
        time--;

        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "0";
            timeOff.textContent = "Time Off";
        
            showResultBox();

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class", "option correct")  
                }
             }   
             for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disable");
            }
            next_btn.style.display  = "block"; 
        }
        
    }
}

function queCounter(index){
    var bottom_que_counter = quizBox.querySelector(".total-questions");
    let totalQuestionCountTag = '<span>' + index + ' Of ' + questions.length + ' Questions</span>';
    bottom_que_counter.innerHTML = totalQuestionCountTag;
}








