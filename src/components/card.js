import { openImgPopup, cardTemplate, } from '../index.js';

function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cardElement.querySelector('.card__delete-button');
  const imgPopup = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  removeButton.addEventListener('click', () => removeCard(cardElement));
  imgPopup.addEventListener('click', () => openImgPopup(imgPopup));
  likeButton.addEventListener('click', () => likeCard(likeButton));

  return cardElement
}

function removeCard(card) {
  card.remove()
}

function likeCard(evt) {
  evt.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard}