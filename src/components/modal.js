import { nameNewPlaceInput, urlNewPlaceInput, nameInput, jobInput, closePopup, cardsContainer } from '../index.js';
import {createCard, removeCard} from './card.js';
import { initialCards } from '../cards.js';

function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__description').textContent = jobInput.value;
  document.querySelector('.profile__title').textContent = nameInput.value;
  closePopup(evt.target.parentElement.parentElement)
}

function newPlacePlus(evt) {
  evt.preventDefault();
  const card = createCard({
    name: nameNewPlaceInput.value,
    link: urlNewPlaceInput.value
  }, removeCard);
  initialCards.unshift({
    name: nameNewPlaceInput.value,
    link: urlNewPlaceInput.value
  });
  cardsContainer.insertBefore(card, cardsContainer.querySelector('li'));
  closePopup(evt.target.parentElement.parentElement)
  nameNewPlaceInput.value = '';
  urlNewPlaceInput.value = '';
}

export {newPlacePlus, handleFormSubmit}