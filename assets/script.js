// elements 
var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart");
var quizBox = document.querySelector(".quiz-box");
var option_list = document.querySelector(".option-list");
var timeCount = quizBox.querySelector(".timer .timer-sec");
var timeLine = quizBox.querySelector("header .time_line");
var timeOff = quizBox.querySelector("header .time-text");

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
    startTimer(30);
    startTimerLine(0);
}

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

var next_btn = quizBox.querySelector(".next-btn");
var result_box = document.querySelector(".result-box");
var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");

quit_quiz.onclick = ()=>{
    window.location.reload();
}

restart_quiz.onclick = ()=>{
quizBox.classList.add("activeQuiz");
result_box.classList.remove("activeResult");
let que_count = 0;
let que_numb = 1;
let timeValue = 30;
let widthValue = 0;

showQuestions(que_count);
queCounter(que_numb);
clearInterval(counter);
startTimer(timeValue);
clearInterval(counterLine);
startTimerLine(widthValue);
next_btn.style.display = "none";
timeOff.textContent = "Time Left";
}

//if next button clicked
next_btn.onclick = ()=>{
if(que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showQuestions(que_count)
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display  = "none";
    timeOff.textContent = "Time Left";
} else{
    clearInterval(counter);
    clearInterval(counterLine);
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
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
    console.log("Answer is Correct");
    answer.classList.add("correct");
    } else {
        answer.classList.add("incorrect");
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
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz"); // show quiz box 
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

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    var bottom_que_counter = quizBox.querySelector(".total-questions");
    let totalQuestionCountTag = '<span>' + index + ' Of ' + questions.length + ' Questions</span>';
    bottom_que_counter.innerHTML = totalQuestionCountTag;
}




