import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__place-name');
  }

  open(photo, caption) {
    this._photo.src = photo;
    this._photo.alt = `${caption}. Иллюстрация.`;
    this._caption.textContent = caption;
    super.open();
  }
}
