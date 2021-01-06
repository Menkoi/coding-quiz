// elements 
var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = infoBox.querySelector(".buttons .quit");
var continueBtn = infoBox.querySelector(".buttons .restart");
var quizBox = document.querySelector(".quiz-box");

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
    var option_list = document.querySelector(".option-list");
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

function queCounter(index){
    var bottom_que_counter = quizBox.querySelector(".total-questions");
    let totalQuestionCountTag = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Quesitons</span>';
    bottom_que_counter.innerHTML = totalQuestionCountTag;
}




