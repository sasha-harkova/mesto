export default class FormValidator {
  constructor(input, obj) {
    this._obj = obj;
    this._input = input;
  }

  _showInputError() {
    this._form = this._input.closest(`${this._obj.formSelector}`);
    this._error = this._form.querySelector(`#${this._input.id}-error`);
    this._input.classList.add(`${this._obj.inputErrorClass}`);
    this._error.textContent = this._input.validationMessage;
    this._error.classList.add(`${this._obj.errorClass}`);
  }

  _hideInputError() {
    this._form = this._input.closest(`${this._obj.formSelector}`);
    this._error = this._form.querySelector(`#${this._input.id}-error`);
    this._input.classList.remove(`${this._obj.inputErrorClass}`);
    this._error.textContent = "";
    this._error.classList.remove(`${this._obj.errorClass}`);
  }

  _deactivateButton() {
    this._form = this._input.closest(`${this._obj.formSelector}`);
    this._button = this._form.querySelector(`${this._obj.submitButtonSelector}`);
    this._button.classList.add(`${this._obj.inactiveButtonClass}`);
    this._button.setAttribute("disabled", "disabled");
  };

  _activateButton() {
    this._form = this._input.closest(`${this._obj.formSelector}`);
    this._button = this._form.querySelector(`${this._obj.submitButtonSelector}`);
    this._button.classList.remove(`${this._obj.inactiveButtonClass}`);
    this._button.removeAttribute("disabled", "disabled");
    this._button.style.opacity = "";
    this._button.style.cursor = "";
  }

  _checkInputValidity() {
    if(!this._input.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    };
  };

  _hasInvalidInput() {
    this._form = this._input.closest(`${this._obj.formSelector}`);
    this._inputList = Array.from(this._form.querySelectorAll(`${this._obj.inputSelector}`));
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._deactivateButton();
    } else {
      this._activateButton();
    }
  };

  _setEventListenerToInput() {
    this._input.addEventListener("input", () => {
      this._checkInputValidity();
      this._toggleButtonState();
    });
  };

  enableValidation() {
    this._setEventListenerToInput();
  };
};
