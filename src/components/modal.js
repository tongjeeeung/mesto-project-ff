function openPopup(item) {
  item.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeEsc);
};

function closePopup(item) {
  item.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeEsc);
}

function closeEsc(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

export {openPopup, closePopup}