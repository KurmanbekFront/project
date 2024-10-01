// GMAIL CHECKER

const gmailInput = document.querySelector("#gmail_input")
const gmailButton = document.querySelector("#gmail_button")
const gmailResult = document.querySelector("#gmail_result")

const regExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

gmailButton.onclick = () => {
    if(regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = "OK"
        gmailResult.style.color = "green"
    } else {
        gmailResult.innerHTML = "NOT OK"
        gmailResult.style.color = "red"
    }
}

// MOVE BLOCK

const childBlock = document.querySelector(".child_block")

let num = 0

const recursionFunc = () => {
    num++
    
    if(num <= 450) {
        childBlock.style.left = `${num}px`
        requestAnimationFrame(recursionFunc)
    }
}
recursionFunc()