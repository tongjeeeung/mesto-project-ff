import './index.css';
import { avatarPatch, newPlacePost, profileEditPatch, getCards, getProfileInfo } from './components/api.js';
import { createCard, removeCard , likeCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';

const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const editPopup = document.querySelector('.popup_type_edit');
const plusPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAddNewCard = document.querySelector('.profile__add-button');
const profileImg = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const imgPopup = document.querySelector('.popup_type_image');
const imgPopupImg = document.querySelector('.popup__image');
const imgPopupParagraph = document.querySelector('.popup__caption');
const closeButtons = document.querySelectorAll('.popup__close');
const formElement = document.querySelector('.popup__form');
const newPlaceForm = document.getElementsByName('new-place')[0];
const avatarForm = avatarPopup.querySelector('.popup__form');
const urlAvatarInput = avatarForm.querySelector('.popup__input_type_url');
const nameNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const urlNewPlaceInput = newPlaceForm.querySelector('.popup__input_type_url');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

getProfileInfo()
  .then(res => res.json())
  .then(res => {
    profileTitle.textContent = res.name;
    profileJob.textContent = res.about
    profileImg.style.backgroundImage = `url('${res.avatar}')`;
  })

buttonEdit.addEventListener('click', evt => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopup.querySelector(validationConfig.formSelector), validationConfig)
  openPopup(editPopup);
});

buttonAddNewCard.addEventListener('click', () => {
  nameNewPlaceInput.value = '';
  urlNewPlaceInput.value = '';
  openPopup(plusPopup);
  clearValidation(plusPopup.querySelector(validationConfig.formSelector), validationConfig);
});

profileImg.addEventListener('click', () => {
  urlAvatarInput.value = '';
  clearValidation(avatarPopup.querySelector(validationConfig.formSelector), validationConfig);
  openPopup(avatarPopup);
})


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

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileJob.textContent = jobInput.value;
  profileTitle.textContent = nameInput.value;
  renderLoading(true, formElement.querySelector('.button'));
  profileEditPatch({name: nameInput.value,
    about: jobInput.value})
    .finally(() => {
      renderLoading(false, formElement.querySelector('.button'));
    })

  closePopup(evt.target.closest('.popup'));
};

function newPlacePlus(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceForm.querySelector('.button'));
  newPlacePost({name: nameNewPlaceInput.value,
    link: urlNewPlaceInput.value})
    .then(res => res.json())
    .then(res => {
      const card = createCard(res, removeCard, likeCard);
      cardsContainer.prepend(card);
    })
    .finally(() => {
      renderLoading(false, newPlaceForm.querySelector('.button'));
    })

  closePopup(plusPopup)
  nameNewPlaceInput.value = '';
  urlNewPlaceInput.value = '';
}

function handleAvatarEdit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarForm.querySelector('.button'));
  avatarPatch({avatar: urlAvatarInput.value})
    .finally(() => {
      renderLoading(false, avatarForm.querySelector('.button'));
    })

  profileImg.style.backgroundImage = `url('${urlAvatarInput.value}')`;
  closePopup(avatarPopup);
  urlAvatarInput.value = '';
}

function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlacePlus);
avatarForm.addEventListener('submit', handleAvatarEdit);

enableValidation(validationConfig);

getCards()
  .then(res => res.json())
  .then((result) => {
    result.forEach(cardElement => {
      const card = createCard(cardElement, removeCard, likeCard);
      cardsContainer.append(card);
    });
  });

export {cardTemplate, openImgPopup};