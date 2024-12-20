// PHONE CHECKER

const phoneInput = document.querySelector("#phone_input");
const phoneButton = document.querySelector("#phone_button");
const phoneResult = document.querySelector("#phone_result");

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
  if (regExp.test(phoneInput.value)) {
    phoneResult.innerHTML = "OK";
    phoneResult.style.color = "green";
  } else {
    phoneResult.innerHTML = "NOT OK";
    phoneResult.style.color = "red";
  }
};

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabItems = document.querySelectorAll(".tab_content_item");
const tabParent = document.querySelector(".tab_content_items");

const hideTabContent = () => {
  tabContentBlocks.forEach((item) => {
    item.style.display = "none";
  });
  tabItems.forEach((item) => {
    item.classList.remove("tab_content_item_active");
  });
};

const showTabContent = (index = 0) => {
  tabContentBlocks[index].style.display = "block";
  tabItems[index].classList.add("tab_content_item_active");
};

let currentIndex = 0;
let intervalId;

const switchTab = () => {
  hideTabContent();
  currentIndex = (currentIndex + 1) % tabContentBlocks.length;
  showTabContent(currentIndex);
};

const startSwitch = () => {
  intervalId = setInterval(() => {
    switchTab();
  }, 3000);
};

const stopSwitch = () => {
  clearInterval(intervalId);
};

hideTabContent();
showTabContent(currentIndex);
startSwitch();

tabParent.onclick = (event) => {
  if (event.target.classList.contains("tab_content_item")) {
    tabItems.forEach((item, index) => {
      if (event.target === item) {
        stopSwitch();
        hideTabContent();
        showTabContent(index);
        currentIndex = index;
        startSwitch();
      }
    });
  }
};

// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const converter = (element, targetElement1, targetElement2) => {
  element.oninput = async () => {
    try {
      const response = await fetch("../data/converter.json");
      const data = await response.json();
      console.log(data.eur / data.usd);
      if (element.id === "som") {
        targetElement1.value = (element.value / data.usd).toFixed(2);
        targetElement2.value = (element.value / data.eur).toFixed(2);
      }
      if (element.id === "usd") {
        targetElement1.value = (element.value * data.usd).toFixed(2);
        targetElement2.value = ((element.value * data.eur) / 100).toFixed(2);
      }
      if (element.id === "eur") {
        targetElement1.value = (element.value * data.eur).toFixed(2);
        targetElement2.value = ((element.value * data.eur) / data.usd).toFixed(
          2
        );
      }
      if (element.value === "") {
        targetElement1.value = "";
        targetElement2.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);

// somInput.oninput = () => {
//     const request = new XMLHttpRequest()
//     request.open("GET", "../data/converter.json")
//     request.setRequestHeader("Content-type", "application/json")
//     request.send()
//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         usdInput.value = (somInput.value / data.usd).toFixed(2)

//     }
// }

// usdInput.oninput = () => {
//     const request = new XMLHttpRequest()
//     request.open("GET", "../data/converter.json")
//     request.setRequestHeader("Content-type", "application/json")
//     request.send()
//     request.onload = () => {
//         const data = JSON.parse(request.response)
//         somInput.value = (usdInput.value * data.usd).toFixed(2)

//     }
// }

//

// CARD SWITCHER

const card = document.querySelector(".card");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");

const request = async (cardId) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${cardId}`
    );
    const data = await response.json();
    const { id, title, completed } = data;
    card.innerHTML = `
        <p>${title}</p>
        <p>${completed}</p>
        <span>${id}</span>
    `;
  } catch (error) {
    console.log(error);
  }
};

let cardId = 1;

nextBtn.onclick = () => {
  cardId++;
  if (cardId > 200) {
    cardId = 1;
  }
  request(cardId);
};

prevBtn.onclick = () => {
  cardId--;
  if (cardId < 1) {
    cardId = 200;
  }
  request(cardId);
};
request(cardId);

// FETCH REQUEST

const requestTest = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
requestTest()

// WEATHER SEARCH

const searchInput = document.querySelector(".cityName");
const searchBtn = document.querySelector("#search");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

// query params

const API_KEY = "e417df62e04d3b1b111abeab19cea714";
const BASE_URL = "http://api.openweathermap.org/data/2.5/weather";

searchInput.oninput = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}?q=${searchInput.value}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    city.innerHTML = data.name || "Город не найден";
    temp.innerHTML = data.main?.temp
      ? Math.round(data.main?.temp) + `&deg;C`
      : "Температура не определена";
  } catch (error) {
    console.log(error);
  }
};
