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

// CHARACTER CARD

const characterList = document.querySelector(".characters-list")


const request = () => {
  const userPhoto = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
  const request = new XMLHttpRequest()
  request.open("GET", "/data/persons.json")
  request.setRequestHeader("Content-type", "application/json")
  request.send()
  request.onload = () => {
    const data = JSON.parse(request.response)
    data.forEach((item) => {
      const personCard = document.createElement("div")
      personCard.setAttribute("class", "character-card")
      personCard.innerHTML = `
      <div class="character-photo">
        <img src="${item.person_photo || userPhoto}" alt="${item.name}">
      </div>
      <h2>${item.name}</h2>
      <h3>age: ${item.age}</h3>
      `
      characterList.appendChild(personCard)
    });  
  }
}
request()

// ANY JSON

const anyRequest = new XMLHttpRequest()
anyRequest.open("GET", "/data/any.json")
anyRequest.setRequestHeader("Content-type", "application/json")
anyRequest.send()
anyRequest.onload = () => {
    const data = JSON.parse(anyRequest.response)
    data.forEach((item) => {
      console.log(item);
    });  
  }
