import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__place-name');
  }

  open(data) {
    this._photo.src = data.link;
    this._photo.alt = `${data.name}. Иллюстрация.`;
    this._caption.textContent = data.name;
    super.open();
  }
}
