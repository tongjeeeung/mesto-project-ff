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

buttonEdit.addEventListener('click', evt => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editPopup.querySelector(validationConfig.formSelector), validationConfig, editPopup.querySelector(validationConfig.submitButtonSelector))
  openPopup(editPopup);
});

buttonAddNewCard.addEventListener('click', () => {
  nameNewPlaceInput.value = '';
  urlNewPlaceInput.value = '';
  clearValidation(plusPopup.querySelector(validationConfig.formSelector), validationConfig, plusPopup.querySelector(validationConfig.submitButtonSelector));
  openPopup(plusPopup);
});

profileImg.addEventListener('click', () => {
  urlAvatarInput.value = '';
  clearValidation(avatarPopup.querySelector(validationConfig.formSelector), validationConfig, avatarPopup.querySelector(validationConfig.submitButtonSelector));
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
  item.addEventListener('mousedown', evt => {
    if(evt.target === item) {
      closePopup(evt.target);
    }
  })
})

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formElement.querySelector('.button'));

  profileEditPatch({name: nameInput.value,
    about: jobInput.value})
    .then(res => {
      profileJob.textContent = res.about;
      profileTitle.textContent = res.name;
      closePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, formElement.querySelector('.button'));
    })
};

function newPlacePlus(evt) {
  evt.preventDefault();
  renderLoading(true, newPlaceForm.querySelector('.button'));
  newPlacePost({name: nameNewPlaceInput.value,
    link: urlNewPlaceInput.value})
    .then(res => {
      const card = createCard(res, removeCard, likeCard, res.owner, openImgPopup, cardTemplate);
      cardsContainer.prepend(card);
      closePopup(plusPopup)
      nameNewPlaceInput.value = '';
      urlNewPlaceInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, newPlaceForm.querySelector('.button'));
    })
}

function handleAvatarEdit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarForm.querySelector('.button'));
  avatarPatch({avatar: urlAvatarInput.value})
    .then(res => {
      profileImg.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(avatarPopup);
      urlAvatarInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarForm.querySelector('.button'));
    })
}

function renderLoading(isLoading, button) {
  if(button.textContent[2] == 'х' && isLoading) {
    button.textContent = 'Сохранение...';
  }
  else if(button.textContent[2] == 'х') {
    button.textContent = 'Сохранить';
  }
  else if(isLoading) {
    button.textContent = 'Создание...';
  }
  else {
    button.textContent = 'Создать';
  }
}

formElement.addEventListener('submit', handleFormSubmit);
newPlaceForm.addEventListener('submit', newPlacePlus);
avatarForm.addEventListener('submit', handleAvatarEdit);

enableValidation(validationConfig);

Promise.all([getProfileInfo(), getCards()])
  .then(([info, initialCards]) => {
    profileTitle.textContent = info.name;
    profileJob.textContent = info.about
    profileImg.style.backgroundImage = `url('${info.avatar}')`;

    initialCards.forEach(cardElement => {
      const card = createCard(cardElement, removeCard, likeCard, info, openImgPopup, cardTemplate);
      cardsContainer.append(card);
    });
  })
  .catch(err => {console.log(err)})