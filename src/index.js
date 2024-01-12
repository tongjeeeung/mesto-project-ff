import './index.css';
import { initialCards } from './cards';
import {createCard, removeCard , likeCard} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editPopup = document.querySelector('.popup_type_edit');
const plusPopup = document.querySelector('.popup_type_new-card');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const imgPopup = document.querySelector('.popup_type_image');
const imgPopupImg = document.querySelector('.popup__image');
const imgPopupParagraph = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const newPlaceForm = document.getElementsByName('new-place')[0];
const nameNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const urlNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_url');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

buttonEdit.addEventListener('click', evt => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

buttonAddNewCard.addEventListener('click', () => openPopup(plusPopup));

closeButtons.forEach(item => {
  item.addEventListener('click', evt => {
    closePopup(evt.target.closest('.popup'));
  })
});

function openImgPopup(evt) {
  imgPopupImg.src = evt.src;
  imgPopupImg.alt = evt.alt;
  imgPopupParagraph.textContent = evt.alt;
  openPopup(imgPopup);
};

document.querySelectorAll('.popup').forEach(item => {
  item.addEventListener('click', evt => {
    if(evt.target === item) {
      closePopup(evt.target);
    }
  })
})

initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, likeCard);
  cardsContainer.append(card);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileTitle.textContent = nameInput.value;
  closePopup(evt.target.closest('.popup'));
};

function newPlacePlus(evt) {
  evt.preventDefault();
  const card = createCard({
    name: nameNewPlaceInput.value,
    link: urlNewPlaceInput.value
  }, removeCard, likeCard);
  cardsContainer.prepend(card);
  closePopup(evt.target.parentElement.parentElement)
  nameNewPlaceInput.value = '';
  urlNewPlaceInput.value = '';
}

formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlacePlus);

export {cardTemplate, openImgPopup};