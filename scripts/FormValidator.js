export default class FormValidator {
  constructor(obj, formElement) {
    this._formElement = formElement;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(`${this._inputSelector}`));
    this._buttonElement = this._formElement.querySelector(`${this._submitButtonSelector}`);
  }

  _showInputError(inputElement) {
    inputElement.classList.add(`${this._inputErrorClass}`);
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(`${this._errorClass}`);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(`${this._inputErrorClass}`);
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(`${this._errorClass}`);
  }

  deactivateButton() {
    this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  _activateButton() {
    this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
    this._buttonElement.removeAttribute("disabled", "disabled");
  }

  _clearInputAndError() {
    this._formElement.reset()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateButton();
    } else {
      this._activateButton();
    }
  }

  _setEventListenerToInput() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListenerToInput();
    this._clearInputAndError();
  }
}
