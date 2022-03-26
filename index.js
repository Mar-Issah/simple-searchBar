//get the template card
const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[data-user-card-container]');
const input = document.querySelector('[data-input]');

let users = [];

//once you start typing it check if the the value matches the name/email if false hide the divs

//toggle accepts a second boolean parameter

input.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
    user.element.classList.toggle('hide', !isVisible);
  });
  console.log(users);
});

fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      //console.log(card); //this will return document.fragment with the card inside of it. return it children

      //get the header and bodey of card and populate fields
      //append each card to the card container
      const header = card.querySelector('[data-header]');
      const body = card.querySelector('[data-body]');
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });
