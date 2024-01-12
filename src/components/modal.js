function openPopup(item) {
  item.classList.add('popup_is-opened');

  document.addEventListener('keydown', (evt) => closeEsc(evt, item));
};

function closePopup(item) {
  item.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', (evt) => closeEsc(evt, item));
}

function closeEsc(evt, item) {
  if(evt.key === 'Escape') {
    closePopup(item);
  }
};

export {openPopup, closePopup, closeEsc}