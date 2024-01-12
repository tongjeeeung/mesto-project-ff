import { openImgPopup, cardTemplate } from '../index.js';

function createCard(cardData, removeCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cardElement.querySelector('.card__delete-button');
  const imgCard = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  removeButton.addEventListener('click', () => removeCard(cardElement));
  imgCard.addEventListener('click', () => openImgPopup(imgCard));
  likeButton.addEventListener('click', () => likeCard(likeButton));

  return cardElement
}

function removeCard(card) {
  card.remove()
}

function likeCard(evt) {
  evt.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard}