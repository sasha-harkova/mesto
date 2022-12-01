import Popup from "./Popup.js";

export default class PopupOfConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._popupSubmitButton = this._form.querySelector('.popup__save-button');
    this._popupSubmitButtonText = this._popupSubmitButton.textContent;
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupSubmitButton.textContent = "Удаление...";
    } else {
      this._popupSubmitButton.textContent = this._popupSubmitButtonText;
    }
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  };


}
