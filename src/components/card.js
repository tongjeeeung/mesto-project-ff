import { openImgPopup, cardTemplate } from '../index.js';
import { cardDelete, likeCardFeach } from './api.js';

function createCard(cardData, removeCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const removeButton = cardElement.querySelector('.card__delete-button');
  const imgCard = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  
  if(cardData.owner._id !== "2c59d3016a10baf5de5cbb8f") {
    cardElement.removeChild(removeButton);
  }

  if(cardData.likes.find(({ _id }) => _id === "2c59d3016a10baf5de5cbb8f")) {
    likeButton.classList.add('card__like-button_is-active');
  }

  imgCard.src = cardData.link;
  imgCard.alt = cardData.name;
  likeCounter.textContent = cardData.likes.length;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  removeButton.addEventListener('click', () => removeCard(cardElement, cardData._id));
  imgCard.addEventListener('click', () => openImgPopup(imgCard));
  likeButton.addEventListener('click', () => likeCard(likeButton, cardData, likeCounter));

  return cardElement
}

function removeCard(card, cardId) {
  cardDelete(cardId);
  card.remove()
}

function likeCard(evt, cardData, likeCounter) {
  if(!evt.classList.contains('card__like-button_is-active')) {
    likeCardFeach(cardData._id, 'PUT')
    .then(res => res.json())
    .then(res => {
      likeCounter.textContent = res.likes.length;
    })
  }
  else {
    likeCardFeach(cardData._id, 'DELETE')
    .then(res => res.json())
    .then(res => {
      likeCounter.textContent = res.likes.length;
    })
  }
  evt.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard}