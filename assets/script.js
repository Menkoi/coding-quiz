// elements 
var startBtn = document.querySelector(".start-btn button");
var infoBox = document.querySelector(".info-box");
var exitBtn = document.querySelector(".buttons .quit");
var continueBtn = document.querySelector(".buttons .restart")

// start quiz button clicked
startBtn.onclick = ()=>{
    infoBox.classList.add("activeInfo");
}

// start quiz button clicked
exitBtn.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
}



