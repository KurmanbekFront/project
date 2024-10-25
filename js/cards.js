// CARDS

const cardsList = document.querySelector(".cards_list");
const userPhoto ="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";

const cardPhoto = `https://variety.com/wp-content/uploads/2024/09/T1_FP_145-e1725988221346.jpg?w=1000&h=667&crop=1`;

const cardsRequest = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();
    data.slice(0, 4).forEach((item) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.innerHTML = `
        <h2>${item.title}</h2>
        <div class="card-photo">
            <img src="${cardPhoto || userPhoto}" alt="${item.title}">
        </div>
        <h3>${item.body}</h3>
        `;
      cardsList.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};
cardsRequest();
