import './index.css';
import { initialCards } from './cards';
import {createCard, removeCard} from './components/card.js';
import {newPlacePlus, handleFormSubmit} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editPopup = document.querySelector('.popup_type_edit');
const plusPopup = document.querySelector('.popup_type_new-card');
const buttonsProfile = document.querySelector('.profile');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const newPlaceForm = document.getElementsByName('new-place')[0];
const nameNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const urlNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_url');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

buttonsProfile.addEventListener('click', evt => {
  if(evt.target.classList.value === 'profile__edit-button') {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    openPopup(editPopup);
  }
  if(evt.target.classList.value === 'profile__add-button') {
    openPopup(plusPopup);
  }
})

closeButtons.forEach(item => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.parentElement.parentElement);
  })
})

function openImgPopup(evt) {
  document.querySelector('.popup__image').src = evt.src;
  document.querySelector('.popup__image').alt = evt.alt;
  document.querySelector('.popup__caption').textContent = evt.alt;
  openPopup(document.querySelector('.popup_type_image'))
}

document.querySelectorAll('.popup').forEach(item => {
  item.addEventListener('click', evt => {
    if(evt.target === item) {
      closePopup(evt.target);
    }
  })
})

function openPopup(item) {
  item.classList.add('popup_is-opened');
  //item.classList.add('popup_is-animated');

  document.addEventListener('keydown', evt => {
    if(evt.key === 'Escape') {
      closePopup(item);
    }
  })
};

function closePopup(item) {
  item.classList.remove('popup_is-opened');
  //item.classList.remove('popup_is-animated');

  document.removeEventListener('keydown', evt => {});
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard);
  cardsContainer.append(card);
});

formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlacePlus);

export {cardsContainer, cardTemplate, openImgPopup, closePopup, nameNewPlaceInput, urlNewPlaceInput, nameInput, jobInput};