function enableValidation(validationConfig) {
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach(formElement => {
    setEventListenersForm(formElement, validationConfig);
  })
}

function setEventListenersForm(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function checkInputValidity(popup, inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    if(inputElement.validity.patternMismatch) {
      showInputError(popup, inputElement, inputElement.dataset.errorMessage, validationConfig);
    }
    else {
      showInputError(popup, inputElement, inputElement.validationMessage, validationConfig);
    }
  } else {
    hideInputError(popup, inputElement, validationConfig);
  }
}

function showInputError(popup, inputElement, errorMessage, validationConfig) {
  const errorElement = popup.querySelector(`.${inputElement.classList[1]}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(popup, inputElement, validationConfig) {
  const errorElement = popup.querySelector(`.${inputElement.classList[1]}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = '';
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
  else {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function clearValidation(formElement, validationConfig) {
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  const spanList = formElement.querySelectorAll(`.${validationConfig.errorClass}`);
  inputList.forEach(inputElement => {
    if(inputElement.classList.contains(validationConfig.inputErrorClass)) {
      inputElement.classList.remove(validationConfig.inputErrorClass);
    }
  })
  spanList.forEach(spanElement => {
    spanElement.textContent = '';
  })
}

export { enableValidation, clearValidation };