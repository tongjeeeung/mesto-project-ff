// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const placeList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(element) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = `${element.link}`;
  cardElement.querySelector('.card__title').textContent = `${element.name}`;

  const removeButton = cardElement.querySelector('.card__delete-button');
  removeButton.addEventListener('click', function() {
    removeCard(element.name);
  })

  return cardElement
}

function removeCard(name) {
  let i = 0;
  cards.forEach((element) => {
    if(element.querySelector('.card__title').textContent === name) {
      cards[i].remove();
      i = 0;
    }
    else {
      i += 1;
    }
  })
}

initialCards.forEach((element) => {
  let card = createCard(element);
  placeList.append(card);
})

const cards = document.querySelectorAll('.card');
