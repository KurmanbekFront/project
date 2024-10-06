// GMAIL CHECKER

const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailButton.onclick = () => {
  if (regExp.test(gmailInput.value)) {
    gmailResult.innerHTML = "OK";
    gmailResult.style.color = "green";
  } else {
    gmailResult.innerHTML = "NOT OK";
    gmailResult.style.color = "red";
  }
};

// MOVE BLOCK

const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;

const offsetWidth = parentBlock.offsetWidth - childBlock.offsetWidth;
const offsetHeight = parentBlock.offsetHeight - childBlock.offsetHeight;

const recursionFunc = () => {
  if (positionX < offsetWidth && positionY === 0) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(recursionFunc);
  } else if (positionX >= offsetWidth && positionY < offsetHeight) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(recursionFunc);
  } else if (positionX > 0 && positionY >= offsetHeight) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
    requestAnimationFrame(recursionFunc);
  } else if (positionY > 0 && positionX === 0) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
    requestAnimationFrame(recursionFunc);
  }
};
recursionFunc();

// STOPWATCH BLOCK

const interval = document.querySelector(".interval");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

console.log(interval);
let count = 0;
let intervalTrue;
let running = false;
const timer = () => {
  startBtn.onclick = () => {
    if(running) return
    running = true
    intervalTrue = setInterval(() => {
      count++;
      interval.innerHTML = count;
    }, 1000);
  };
};

const stopTimer = () => {
    clearInterval(intervalTrue)
    running = false
}

const resetTimer = () => {
    clearInterval(intervalTrue)
    running = false
    count = 0
    interval.innerHTML = count
}

stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;

timer();
