const objForValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(`${objForValidation.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${objForValidation.errorClass}`);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(`${objForValidation.inputErrorClass}`);
  errorElement.textContent = "";
  errorElement.classList.remove(`${objForValidation.errorClass}`);
};

function clearInputError(popup) {
    const formElement = popup.querySelector(`${objForValidation.formSelector}`);
    const inputList = Array.from(formElement.querySelectorAll(`${objForValidation.inputSelector}`));
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement);
    });
};

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function setEventListenersToInputs(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(`${objForValidation.inputSelector}`));
  const buttonElement = formElement.querySelector(`${objForValidation.submitButtonSelector}`);
  toggleButtonState(inputList, buttonElement)
  inputList.forEach(inputElement => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(`${objForValidation.formSelector}`));
  formList.forEach(formElement => {
    setEventListenersToInputs(formElement);
  })
};

enableValidation();

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

function deactivateButton(buttonElement) {
  buttonElement.classList.add(`${objForValidation.inactiveButtonClass}`);
  buttonElement.setAttribute("disabled", "disabled");
};

function handleDeactivateButtonAtForm(evt) {
  const buttonElement = evt.target.querySelector(`${objForValidation.submitButtonSelector}`);
  deactivateButton(buttonElement);
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    deactivateButton(buttonElement);
  } else {
    buttonElement.classList.remove(`${objForValidation.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};
