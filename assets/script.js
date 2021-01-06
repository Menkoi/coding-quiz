// elements 
var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart");
var quizBox = document.querySelector(".quiz-box");
var option_list = document.querySelector(".option-list");

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
}

let que_count = 0;
let que_numb = 1;

var next_btn = quizBox.querySelector(".next-btn")

//if next button clicked
next_btn.onclick = ()=>{
if(que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showQuestions(que_count)
    queCounter(que_numb);
} else{
    console.log("Questions Complete")
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
}


function queCounter(index){
    var bottom_que_counter = quizBox.querySelector(".total-questions");
    let totalQuestionCountTag = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Quesitons</span>';
    bottom_que_counter.innerHTML = totalQuestionCountTag;
}




