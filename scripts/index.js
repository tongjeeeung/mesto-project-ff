// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  removeButton.addEventListener('click', () => removeCard(cardElement));

  return cardElement
}

function removeCard(card) {
  card.remove()
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard);
  cardsContainer.append(card);
});
